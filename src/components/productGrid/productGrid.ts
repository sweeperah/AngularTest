import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ProductCard } from './productCard/productCard'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  rating: number
  imageSeed: string
}

@Component({
  selector: 'ProductGrid',
  imports: [RouterLink, ProductCard],
  template: `
    <div class="ProductGrid">
      @for (product of products(); track product.id) {
        <a class="ProductGridLink" [routerLink]="['/product', product.id]">
          <ProductCard
            [name]="product.name"
            [category]="product.category"
            [price]="product.price"
            [rating]="product.rating"
            [imageSeed]="product.imageSeed"
          />
        </a>
      }
    </div>
  `,
  styleUrl: './productGrid.scss',
})
export class ProductGrid {
  readonly products = input.required<Product[]>()
}
