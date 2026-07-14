import { Component, computed, input } from '@angular/core'

export type GoogleSymbolWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700

@Component({
  selector: 'GoogleSymbol',
  imports: [],
  template: `
    <div
      class="GoogleSymbol material-symbols-outlined"
      [style.font-size.px]="size()"
      [style.color]="color()"
      [style.font-variation-settings]="fontVariationSettings()"
      [attr.aria-hidden]="label() ? null : true"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label()"
    >
      {{ name() }}
    </div>
  `,
  styleUrl: './googleSymbol.scss',
})
export class GoogleSymbol {
  readonly name = input.required<string>()
  readonly size = input(24)
  readonly weight = input<GoogleSymbolWeight>(400)
  readonly fill = input(false)
  readonly grade = input(0)
  readonly color = input<string>()
  readonly label = input<string>()

  protected readonly fontVariationSettings = computed(
    () => `'FILL' ${this.fill() ? 1 : 0}, 'wght' ${this.weight()}, 'GRAD' ${this.grade()}, 'opsz' ${this.size()}`,
  )
}
