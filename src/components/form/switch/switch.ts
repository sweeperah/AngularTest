import { Component, input, model } from '@angular/core'
import { uniqueId } from '../uniqueId'

@Component({
  selector: 'Switch',
  imports: [],
  template: `
    <label class="Switch" [class.disabled]="disabled()" [for]="id">
      <input
        class="SwitchInput"
        type="checkbox"
        role="switch"
        [id]="id"
        [name]="name()"
        [disabled]="disabled()"
        [checked]="checked()"
        (change)="checked.set($any($event.target).checked)"
      />

      <span class="SwitchTrack" aria-hidden="true"></span>

      <span class="SwitchLabel">{{ label() }}</span>
    </label>
  `,
  styleUrl: './switch.scss',
})
export class Switch {
  readonly label = input('')
  readonly name = input('')
  readonly disabled = input(false)

  readonly checked = model(false)

  protected readonly id = uniqueId('switch')
}
