import { Component, forwardRef, input, model, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { uniqueId } from '../../../helpers/uniqueId'

export interface RadioOption {
  label: string
  value: string
}

@Component({
  selector: 'RadioGroup',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroup),
      multi: true,
    },
  ],
  template: `
    <fieldset
      class="RadioGroup"
      [disabled]="disabled() || formDisabled()"
      [attr.aria-describedby]="error() ? errorId : null"
    >
      <legend class="RadioGroupLegend">{{ label() }}</legend>

      @for (option of options(); track option.value) {
        <label class="RadioGroupOption">
          <input
            class="RadioGroupInput"
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="option.value === value()"
            (change)="onChangeValue(option.value)"
            (blur)="onTouched()"
          />

          <span class="RadioGroupOptionLabel">{{ option.label }}</span>
        </label>
      }

      @if (error(); as message) {
        <p class="RadioGroupError" [id]="errorId">{{ message }}</p>
      }
    </fieldset>
  `,
  styleUrl: './radioGroup.scss',
})
export class RadioGroup implements ControlValueAccessor {
  readonly label = input('')
  readonly options = input<RadioOption[]>([])
  readonly disabled = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly formDisabled = signal(false)

  protected readonly name = uniqueId('radioGroup')
  protected readonly errorId = `${this.name}-error`

  private onChange: (value: string) => void = () => {}
  protected onTouched: () => void = () => {}

  protected onChangeValue(value: string): void {
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
