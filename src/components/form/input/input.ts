import { Component, forwardRef, input, model, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { uniqueId } from '../../../helpers/uniqueId'

@Component({
  selector: 'InputComp',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Input),
      multi: true,
    },
  ],
  template: `
    <div [class]="'Input' + name()">
      <label class="InputLabel" [for]="id">{{ label() + (isRequired() ? ' *' : '') }}</label>

      <input
        class="InputField"
        [id]="id"
        [type]="type()"
        [name]="name()"
        [placeholder]="placeholder()"
        [disabled]="disabled() || formDisabled()"
        [required]="isRequired()"
        [value]="value()"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (input)="onInput($any($event.target).value)"
        (blur)="onTouched()"
      />

      @if (error(); as message) {
        <p class="InputError" [id]="errorId">{{ message }}</p>
      }
    </div>
  `,
  styleUrl: './input.scss',
})
export class Input implements ControlValueAccessor {
  readonly label = input('')
  readonly type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>('text')
  readonly name = input('')
  readonly placeholder = input('')
  readonly disabled = input(false)
  readonly isRequired = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly formDisabled = signal(false)

  protected readonly id = uniqueId('input')
  protected readonly errorId = `${this.id}-error`

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
