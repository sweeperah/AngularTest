import { Component, input } from '@angular/core'

@Component({
  selector: 'ButtonComp',
  imports: [],
  template: `
    <button class="btn {{ variant() }}" [type]="type()" [disabled]="disabled()">
      <ng-content />
    </button>
  `,
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<'primary' | 'secondary'>('primary')
  readonly type = input<'button' | 'submit' | 'reset'>('button')
  readonly disabled = input(false)
}
