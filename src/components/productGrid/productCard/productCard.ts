import { Component, computed, input } from '@angular/core'
import { CurrencyPipe, NgOptimizedImage } from '@angular/common'
import { GoogleSymbol } from '../../googleSymbol/googleSymbol'

@Component({
  selector: 'ProductCard',
  imports: [CurrencyPipe, NgOptimizedImage, GoogleSymbol],
  template: `
    <article class="ProductCard">
      <div class="ProductCardMedia">
        <img [ngSrc]="imageUrl()" width="480" height="360" [alt]="name()" />
      </div>

      <div class="ProductCardBody">
        <span class="ProductCardCategory">{{ category() }}</span>

        <h3 class="ProductCardName">{{ name() }}</h3>

        <div class="ProductCardRating" role="img" [attr.aria-label]="rating() + ' out of 5 stars'">
          @for (filled of ratingStars(); track $index) {
            <GoogleSymbol name="star" [fill]="filled" [size]="16" />
          }
        </div>

        <div class="ProductCardFooter">
          <span class="ProductCardPrice">{{ price() | currency }}</span>
        </div>
      </div>
    </article>
  `,
  styleUrl: './productCard.scss',
})
export class ProductCard {
  readonly name = input.required<string>()
  readonly price = input.required<number>()
  readonly category = input('')
  readonly rating = input(0)
  readonly imageSeed = input('')

  protected readonly imageUrl = computed(
    () => `https://picsum.photos/seed/${encodeURIComponent(this.imageSeed() || this.name())}/480/360`,
  )

  protected readonly ratingStars = computed(() => Array.from({ length: 5 }, (_, i) => i < Math.round(this.rating())))
}
