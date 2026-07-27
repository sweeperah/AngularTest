import { Component, input, model } from '@angular/core'
import { uniqueId } from '../uniqueId'

@Component({
  selector: 'InputComp',
  imports: [],
  template: `
    <div [class]="'Input' + name()">
      <label class="InputLabel" [for]="id">{{ label() }}</label>

      <input
        class="InputField"
        [id]="id"
        [type]="type()"
        [name]="name()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [required]="required()"
        [value]="value()"
        [attr.aria-invalid]="error() ? true : null"
        [attr.aria-describedby]="error() ? errorId : null"
        (input)="value.set($any($event.target).value)"
      />

      @if (error(); as message) {
        <p class="InputError" [id]="errorId">{{ message }}</p>
      }
    </div>
  `,
  styleUrl: './input.scss',
})
export class Input {
  readonly label = input('')
  readonly type = input<'text' | 'email' | 'password' | 'number' | 'tel' | 'url'>('text')
  readonly name = input('')
  readonly placeholder = input('')
  readonly disabled = input(false)
  readonly required = input(false)
  readonly error = input<string | null>(null)

  readonly value = model('')

  protected readonly id = uniqueId('input')
  protected readonly errorId = `${this.id}-error`
}
