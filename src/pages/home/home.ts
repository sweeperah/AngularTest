import { Component } from '@angular/core'
import { CustomLayout } from '../../components/customLayout/customLayout'
import { ProductGrid } from '../../components/productGrid/productGrid'
import { products } from '../../components/productGrid/productGrid.data'

@Component({
  selector: 'Home',
  imports: [CustomLayout, ProductGrid],
  template: `
    <CustomLayout>
      <ProductGrid [products]="products" />
    </CustomLayout>
  `,
})
export class Home {
  protected readonly products = products
}
