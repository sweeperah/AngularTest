import { TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { Product } from '../../../services/product.service'
import { ProductGrid } from './productGrid'

const mockProducts: Product[] = [
  {
    id: 'aurora-lounge-chair',
    name: 'Aurora Lounge Chair',
    category: 'Furniture',
    price: 249,
    rating: 4,
    imageSeed: 'aurora-lounge-chair',
    isDirectPay: true,
  },
  {
    id: 'nimbus-table-lamp',
    name: 'Nimbus Table Lamp',
    category: 'Lighting',
    price: 89,
    rating: 5,
    imageSeed: 'nimbus-table-lamp',
    isDirectPay: false,
  },
]

describe('ProductGrid', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGrid],
      providers: [provideRouter([])],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductGrid)
    fixture.componentRef.setInput('products', mockProducts)
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render a linked ProductCard per product', () => {
    const fixture = TestBed.createComponent(ProductGrid)
    fixture.componentRef.setInput('products', mockProducts)
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement
    const links = compiled.querySelectorAll('a.ProductGridLink')

    expect(links.length).toBe(2)
    expect(links[0].getAttribute('href')).toBe('/product/aurora-lounge-chair')
    expect(links[1].getAttribute('href')).toBe('/product/nimbus-table-lamp')
    expect(compiled.querySelectorAll('ProductCard').length).toBe(2)
  })
})
