import { Component, input } from '@angular/core'

@Component({
  selector: 'Card',
  imports: [],
  template: `
    <section class="Card {{ name() }}" [style.--gap]="gap().toString()" [style.--padding]="padding().toString()">
      <ng-content />
    </section>
  `,
  styleUrl: './card.scss',
})
export class Card {
  readonly name = input<string>('')

  readonly gap = input<number>(2)
  readonly padding = input<number>(2)
}
