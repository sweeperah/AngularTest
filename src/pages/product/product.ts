import { Component, computed, effect, ElementRef, input, signal, viewChild } from '@angular/core'
import { CurrencyPipe, NgOptimizedImage } from '@angular/common'
import { CustomLayout } from '../../components/customLayout/customLayout'
import { GoogleSymbol } from '../../components/googleSymbol/googleSymbol'
import { products } from '../../components/productGrid/productGrid.data'

@Component({
  selector: 'ProductPage',
  imports: [CurrencyPipe, NgOptimizedImage, CustomLayout, GoogleSymbol],
  template: `
    <CustomLayout>
      @if (product(); as product) {
        <div class="ProductPage">
          <button
            #zoomTrigger
            type="button"
            class="ProductPageMedia"
            (click)="openZoom()"
            [attr.aria-label]="'Zoom image of ' + product.name"
          >
            <img [ngSrc]="imageUrl()" width="800" height="600" [alt]="product.name" priority />

            <span class="ProductPageZoomHint">
              <GoogleSymbol name="zoom_in" [size]="20" />

              Click to zoom
            </span>
          </button>

          <div class="ProductPageDetails">
            <span class="ProductPageCategory">{{ product.category }}</span>

            <h1 class="ProductPageName">{{ product.name }}</h1>

            <div class="ProductPageRating" role="img" [attr.aria-label]="product.rating + ' out of 5 stars'">
              @for (filled of ratingStars(); track $index) {
                <GoogleSymbol name="star" [fill]="filled" [size]="20" />
              }
            </div>

            <p class="ProductPagePrice">{{ product.price | currency }}</p>
          </div>
        </div>

        @if (isZoomed()) {
          <div class="ProductPageZoomOverlay">
            <div class="ProductPageZoomBackdrop" role="presentation" (click)="closeZoom()"></div>

            <div
              class="ProductPageZoomDialog"
              role="dialog"
              aria-modal="true"
              [attr.aria-label]="'Zoomed image of ' + product.name"
              (keydown.escape)="closeZoom()"
            >
              <img [ngSrc]="imageUrl()" width="1200" height="900" [alt]="product.name" />

              <button
                #closeButton
                type="button"
                class="ProductPageZoomClose"
                (click)="closeZoom()"
                aria-label="Close zoomed image"
              >
                <GoogleSymbol name="close" [size]="28" />
              </button>
            </div>
          </div>
        }
      } @else {
        <p>Product not found.</p>
      }
    </CustomLayout>
  `,
  styleUrl: './product.scss',
})
export class ProductPage {
  readonly id = input('')

  protected readonly product = computed(() => products.find(p => p.id === this.id()))

  protected readonly ratingStars = computed(() => {
    const rating = this.product()?.rating ?? 0
    return Array.from({ length: 5 }, (_, i) => i < Math.round(rating))
  })

  protected readonly imageUrl = computed(() => {
    const product = this.product()
    return product ? `https://picsum.photos/seed/${encodeURIComponent(product.imageSeed)}/1200/900` : ''
  })

  protected readonly isZoomed = signal(false)

  private readonly zoomTrigger = viewChild<ElementRef<HTMLButtonElement>>('zoomTrigger')
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton')

  constructor() {
    effect(() => {
      if (this.isZoomed()) {
        this.closeButton()?.nativeElement.focus()
      }
    })
  }

  protected openZoom(): void {
    this.isZoomed.set(true)
  }

  protected closeZoom(): void {
    this.isZoomed.set(false)
    this.zoomTrigger()?.nativeElement.focus()
  }
}
