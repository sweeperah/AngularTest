import { Component, inject, signal } from '@angular/core'
import { ProductGrid } from '../../components/productGrid/productGrid'
import { Section } from '../../components/section/section'
import { SearchBox } from '../../components/form/searchBox/searchBox'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'Home',
  imports: [ProductGrid, Section, SearchBox],
  template: `
    <Section [title]="'Most Viewed Products'" [description]="'Check out our most popular products below!'" gap="4">
      <SearchBox (searchSubmit)="onSearch($event)" />

      <ProductGrid [products]="products()" />
    </Section>
  `,
})
export default class Home {
  private readonly productService = inject(ProductService)

  readonly title = 'Most Viewed Products'

  protected readonly products = signal(this.productService.getProducts())

  readonly onSearch = (search: string): void => {
    this.products.set(this.productService.searchProducts(search))
  }
}
