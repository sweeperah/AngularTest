import { Component, forwardRef, input, model, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { uniqueId } from '../../../helpers/uniqueId'

export interface SelectOption {
  label: string
  value: string
}

@Component({
  selector: 'SelectComp',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  template: `
    <div class="Select">
      <label class="SelectLabel" [for]="id">{{ label() + (isRequired() ? ' *' : '') }}</label>

      <select
        class="SelectField"
        [id]="id"
        [name]="name()"
        [disabled]="disabled() || formDisabled()"
        [required]="isRequired()"
        [value]="value()"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (change)="onChangeValue($any($event.target).value)"
        (blur)="onTouched()"
      >
        @if (placeholder()) {
          <option value="" disabled>{{ placeholder() }}</option>
        }

        @for (option of options(); track option.value) {
          <option [value]="option.value">{{ option.label }}</option>
        }
      </select>

      @if (error(); as message) {
        <p class="SelectError" [id]="errorId">{{ message }}</p>
      }
    </div>
  `,
  styleUrl: './select.scss',
})
export class Select implements ControlValueAccessor {
  readonly label = input('')
  readonly name = input('')
  readonly placeholder = input('')
  readonly options = input<SelectOption[]>([])
  readonly disabled = input(false)
  readonly isRequired = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly formDisabled = signal(false)

  protected readonly id = uniqueId('select')
  protected readonly errorId = `${this.id}-error`

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
