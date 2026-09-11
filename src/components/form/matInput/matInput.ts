import { Component, effect, forwardRef, input, model } from '@angular/core'
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'MatInput',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatInput),
      multi: true,
    },
  ],
  template: `
    <mat-form-field class="MatInput">
      <mat-label>{{ label() }}</mat-label>

      <input
        matInput
        [formControl]="control"
        [type]="type()"
        [name]="name()"
        [placeholder]="placeholder()"
        [required]="isRequired()"
        (blur)="onTouched()"
      />

      @if (error(); as message) {
        <mat-error>{{ message }}</mat-error>
      }
    </mat-form-field>
  `,
  styleUrl: './matInput.scss',
})
export class MatInput implements ControlValueAccessor {
  readonly label = input('')
  readonly type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>('text')
  readonly name = input('')
  readonly placeholder = input('')
  readonly disabled = input(false)
  readonly isRequired = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly control = new FormControl('', { nonNullable: true })

  private onChange: (value: string) => void = () => {}
  protected onTouched: () => void = () => {}

  constructor() {
    this.control.setValidators(() => (this.error() ? { custom: true } : null))

    this.control.valueChanges.subscribe((next) => {
      this.value.set(next)
      this.onChange(next)
    })

    effect(() => {
      const shouldDisable = this.disabled()
      if (shouldDisable && !this.control.disabled) {
        this.control.disable({ emitEvent: false })
      } else if (!shouldDisable && this.control.disabled) {
        this.control.enable({ emitEvent: false })
      }
    })

    effect(() => {
      if (this.error()) {
        this.control.markAsTouched()
      }
      this.control.updateValueAndValidity({ emitEvent: false })
    })
  }

  writeValue(value: string): void {
    const next = value ?? ''
    this.value.set(next)
    this.control.setValue(next, { emitEvent: false })
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false })
    } else {
      this.control.enable({ emitEvent: false })
    }
  }
}
