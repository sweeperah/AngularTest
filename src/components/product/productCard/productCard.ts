import { Component, computed, Input } from '@angular/core'
import { CurrencyPipe, NgOptimizedImage } from '@angular/common'
import { GoogleSymbol } from '../../googleSymbol/googleSymbol'
import { Product } from '../../../services/product.service'

@Component({
  selector: 'ProductCard',
  imports: [CurrencyPipe, NgOptimizedImage, GoogleSymbol],
  template: `
    <article class="ProductCard">
      <div class="ProductCardMedia">
        <img [ngSrc]="imageUrl()" width="480" height="360" alt="{{ product.name }}" />
      </div>

      <div class="ProductCardBody">
        <span class="ProductCardCategory">{{ product.category }}</span>

        <h3 class="ProductCardName">{{ product.name }}</h3>

        <div class="ProductCardRating" role="img" [attr.aria-label]="product.rating + ' out of 5 stars'">
          @for (filled of ratingStars(); track $index) {
            <GoogleSymbol name="star" [fill]="filled" [size]="16" />
          }
        </div>

        <div class="ProductCardFooter">
          <span class="ProductCardPrice">{{ product.price | currency }}</span>
        </div>
      </div>
    </article>
  `,
  styleUrl: './productCard.scss',
})
export class ProductCard {
  @Input() product!: Product

  protected readonly imageUrl = computed(
    () => `https://picsum.photos/seed/${encodeURIComponent(this.product.imageSeed || this.product.name)}/480/360`,
  )

  protected readonly ratingStars = computed(() => Array.from({ length: 5 }, (_, i) => i < Math.round(this.product.rating)))
}
