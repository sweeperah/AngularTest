import { Component, computed, effect, ElementRef, inject, input, signal, viewChild } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { CurrencyPipe, NgOptimizedImage } from '@angular/common'
import { GoogleSymbol } from '../../components/googleSymbol/googleSymbol'
import { ErrorState } from '../../components/errorState/errorState'
import { ProductService } from '../../services/product.service'
import { Input } from '../../components/form/input/input'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Card } from '../../components/card/card'
import { Button } from '../../components/button/button'

@Component({
  selector: 'ProductPage',
  imports: [CurrencyPipe, NgOptimizedImage, GoogleSymbol, ErrorState, Input, ReactiveFormsModule, Card, Button],
  template: `
    @if (isLoading()) {
      <p class="ProductPageLoading">Loading product…</p>
    } @else if (product(); as product) {
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

          <div>Direct Pay: {{ product.isDirectPay ? 'Yes' : 'No' }}</div>
        </Card>

        <Card class="ProductPageForm">
          <form [formGroup]="applyForm" (ngSubmit)="onSubmit()">
            <InputComp type="text" label="First Name" formControlName="firstName" [isRequired]="true" />

            <InputComp type="text" label="Last Name" formControlName="lastName" [isRequired]="true" />

            <InputComp type="email" label="Email" formControlName="email" [isRequired]="true" />

            <ButtonComp type="submit" [disabled]="applyForm.invalid">Apply</ButtonComp>
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

  private readonly productResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.productService.getProduct(params),
  })

  protected readonly product = computed(() => this.productResource.value())
  protected readonly isLoading = computed(() => this.productResource.isLoading())

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
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
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

  protected onSubmit(): void {
    console.log(this.applyForm.value)
  }
}
