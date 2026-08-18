import { Component, computed, inject, signal } from '@angular/core'
import { rxResource } from '@angular/core/rxjs-interop'
import { ProductGrid } from '../../components/product/productGrid/productGrid'
import { Section } from '../../components/section/section'
import { SearchBox } from '../../components/form/searchBox/searchBox'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'Home',
  imports: [ProductGrid, Section, SearchBox],
  template: `
    <SectionComp [title]="'Most Viewed Products'" [description]="'Check out our most popular products below!'" gap="3">
      <SearchBox (searchSubmit)="onSearch($event)" />

      <ProductGrid [products]="products()" />
    </SectionComp>
  `,
})
export default class Home {
  private readonly productService = inject(ProductService)

  readonly title = 'Most Viewed Products'

  private readonly searchQuery = signal('')

  private readonly productsResource = rxResource({
    params: () => this.searchQuery(),
    stream: ({ params }) =>
      params ? this.productService.searchProducts(params) : this.productService.getProducts(),
  })

  protected readonly products = computed(() => this.productsResource.value() ?? [])

  readonly onSearch = (search: string): void => {
    this.searchQuery.set(search)
  }
}
