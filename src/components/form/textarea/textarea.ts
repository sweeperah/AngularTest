import { Component, input, model } from '@angular/core'
import { uniqueId } from '../uniqueId'

@Component({
  selector: 'TextareaComp',
  imports: [],
  template: `
    <div class="Textarea">
      <label class="TextareaLabel" [for]="id">{{ label() }}</label>

      <textarea
        class="TextareaField"
        [id]="id"
        [name]="name()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [required]="required()"
        [rows]="rows()"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (input)="value.set($any($event.target).value)"
        >{{ value() }}</textarea
      >

      @if (error(); as message) {
        <p class="TextareaError" [id]="errorId">{{ message }}</p>
      }
    </div>
  `,
  styleUrl: './textarea.scss',
})
export class Textarea {
  readonly label = input('')
  readonly name = input('')
  readonly placeholder = input('')
  readonly disabled = input(false)
  readonly required = input(false)
  readonly rows = input(4)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly id = uniqueId('textarea')
  protected readonly errorId = `${this.id}-error`
}
