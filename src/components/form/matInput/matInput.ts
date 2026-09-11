import { Component, forwardRef, input, model, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'MatInput',
  imports: [MatFormFieldModule, MatInputModule],
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
        [type]="type()"
        [name]="name()"
        [placeholder]="placeholder()"
        [disabled]="disabled() || formDisabled()"
        [required]="isRequired()"
        [value]="value()"
        (input)="onInput($any($event.target).value)"
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

  protected readonly formDisabled = signal(false)

  private onChange: (value: string) => void = () => {}
  protected onTouched: () => void = () => {}

  protected onInput(value: string): void {
    this.value.set(value)
    this.onChange(value)
  }

  writeValue(value: string): void {
    this.value.set(value ?? '')
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled)
  }
}
