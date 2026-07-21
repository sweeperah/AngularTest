import { Component, input } from '@angular/core'

@Component({
  selector: 'ButtonComp',
  imports: [],
  template: `
    <button class="btn {{ variant() }}" [type]="type()" [disabled]="disabled()">
      <div class="btnInner">
        <ng-content />
      </div>
    </button>
  `,
  styleUrl: './button.scss',
})
export class Button {
  readonly variant = input<'primary' | 'secondary' | 'icon'>('primary')
  readonly type = input<'button' | 'submit' | 'reset'>('button')
  readonly disabled = input(false)
}
