import { Component, input } from '@angular/core'

@Component({
  selector: 'CustomLayout',
  imports: [],
  template: ` <div class="CustomLayout" [style.--max-width.px]="maxWidth()">
    <div class="CustomLayoutInner">
      <ng-content />
    </div>
  </div>`,
  styleUrl: './customLayout.scss',
})
export class CustomLayout {
  readonly maxWidth = input(1900)
}
