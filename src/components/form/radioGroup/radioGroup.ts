import { Component, input, model } from '@angular/core'
import { uniqueId } from '../uniqueId'

export interface RadioOption {
  label: string
  value: string
}

@Component({
  selector: 'RadioGroup',
  imports: [],
  template: `
    <fieldset class="RadioGroup" [disabled]="disabled()" [attr.aria-describedby]="error() ? errorId : null">
      <legend class="RadioGroupLegend">{{ label() }}</legend>

      @for (option of options(); track option.value) {
        <label class="RadioGroupOption">
          <input
            class="RadioGroupInput"
            type="radio"
            [name]="name"
            [value]="option.value"
            [checked]="option.value === value()"
            (change)="value.set(option.value)"
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
export class RadioGroup {
  readonly label = input('')
  readonly options = input<RadioOption[]>([])
  readonly disabled = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly name = uniqueId('radioGroup')
  protected readonly errorId = `${this.name}-error`
}
