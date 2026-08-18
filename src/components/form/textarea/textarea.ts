import { Component, forwardRef, input, model, signal } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { uniqueId } from '../../../helpers/uniqueId'

@Component({
  selector: 'TextareaComp',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true,
    },
  ],
  template: `
    <div class="Textarea">
      <label class="TextareaLabel" [for]="id">{{ label() + (isRequired() ? ' *' : '') }}</label>

      <textarea
        class="TextareaField"
        [id]="id"
        [name]="name()"
        [placeholder]="placeholder()"
        [disabled]="disabled() || formDisabled()"
        [required]="isRequired()"
        [rows]="rows()"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (input)="onInput($any($event.target).value)"
        (blur)="onTouched()"
        >{{ value() }}</textarea
      >

      @if (error(); as message) {
        <p class="TextareaError" [id]="errorId">{{ message }}</p>
      }
    </div>
  `,
  styleUrl: './textarea.scss',
})
export class Textarea implements ControlValueAccessor {
  readonly label = input('')
  readonly name = input('')
  readonly placeholder = input('')
  readonly disabled = input(false)
  readonly isRequired = input(false)
  readonly rows = input(4)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly formDisabled = signal(false)

  protected readonly id = uniqueId('textarea')
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
