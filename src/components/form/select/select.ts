import { Component, input, model } from '@angular/core'
import { uniqueId } from '../uniqueId'

export interface SelectOption {
  label: string
  value: string
}

@Component({
  selector: 'SelectComp',
  imports: [],
  template: `
    <div class="Select">
      <label class="SelectLabel" [for]="id">{{ label() }}</label>

      <select
        class="SelectField"
        [id]="id"
        [name]="name()"
        [disabled]="disabled()"
        [required]="required()"
        [value]="value()"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (change)="value.set($any($event.target).value)"
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
export class Select {
  readonly label = input('')
  readonly name = input('')
  readonly placeholder = input('')
  readonly options = input<SelectOption[]>([])
  readonly disabled = input(false)
  readonly required = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly id = uniqueId('select')
  protected readonly errorId = `${this.id}-error`
}
