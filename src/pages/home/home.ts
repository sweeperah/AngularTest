import { Component, signal } from '@angular/core'
import { ProductGrid } from '../../components/productGrid/productGrid'
import { products } from '../../components/productGrid/productGrid.data'
import { Section } from '../../components/section/section'
import { SearchBox } from '../../components/form/searchBox/searchBox'

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
  readonly title = 'Most Viewed Products'
  protected readonly products = signal(products)

  readonly onSearch = (search: string): void => {
    if (search) {
      this.products.set(products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())))
    } else {
      this.products.set(products)
    }
  }
}
