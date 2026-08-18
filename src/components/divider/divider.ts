import { Component, input } from '@angular/core'

@Component({
  selector: 'Divider',
  imports: [],
  template: `
    <div class="Divider" [class.Divider--vertical]="isVertical()" role="separator" [attr.aria-orientation]="isVertical() ? 'vertical' : 'horizontal'"></div>
  `,
  styleUrl: './divider.scss',
})
export class Divider {
  readonly isVertical = input(false)
}
