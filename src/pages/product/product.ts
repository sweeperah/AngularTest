import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core'
import { CurrencyPipe, NgOptimizedImage } from '@angular/common'
import { GoogleSymbol } from '../../components/googleSymbol/googleSymbol'
import { ErrorState } from '../../components/errorState/errorState'
import { ProductService } from '../../services/product.service'
import { Input } from '../../components/form/input/input'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Card } from '../../components/card/card'

@Component({
  selector: 'ProductPage',
  imports: [CurrencyPipe, NgOptimizedImage, GoogleSymbol, ErrorState, Input, ReactiveFormsModule, Card],
  template: `
    @if (product(); as product) {
      <article class="ProductPage">
        <button
          #zoomTrigger
          type="button"
          class="ProductPageMedia"
          (click)="openZoom()"
          [attr.aria-label]="'Zoom image of ' + product.name"
        >
          <Card [padding]="0">
            <img [ngSrc]="imageUrl()" width="800" height="600" [alt]="product.name" />

            <span class="ProductPageZoomHint">
              <GoogleSymbol name="zoom_in" [size]="20" />

              Click to zoom
            </span>
          </Card>
        </button>

        <Card class="ProductPageDetails" [gap]="1">
          <span class="ProductPageCategory">{{ product.category }}</span>

          <h1 class="ProductPageName">{{ product.name }}</h1>

          <div class="ProductPageRating" role="img" [attr.aria-label]="product.rating + ' out of 5 stars'">
            @for (filled of ratingStars(); track $index) {
              <GoogleSymbol name="star" [fill]="filled" [size]="20" />
            }
          </div>

          <p class="ProductPagePrice">{{ product.price | currency }}</p>

          <hr />


        </Card>

        <Card class="ProductPageForm">
          <form [formGroup]="applyForm">
            <InputComp type="text" label="First Name" formControlName="firstName" />

            <InputComp type="text" label="Last Name" formControlName="lastName" />

            <InputComp type="email" label="Email" formControlName="email" />
          </form>
        </Card>
      </article>

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
              [attr.aria-label]="'Close zoomed image of ' + product.name"
            >
              <GoogleSymbol name="close" [size]="28" />
            </button>
          </div>
        </div>
      }
    } @else {
      <ErrorState [variant]="'productNotFound'" actionLabel="Back to shop" actionLink="/" />
    }
  `,
  styleUrl: './product.scss',
})
export default class ProductPage {
  private readonly productService = inject(ProductService)

  readonly id = input('')

  protected readonly product = computed(() => this.productService.getProduct(this.id()))

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

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

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
