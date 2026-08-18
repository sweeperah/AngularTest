import { TestBed } from '@angular/core/testing'
import { Product } from '../../../services/product.service'
import { ProductCard } from './productCard'

const mockProduct: Product = {
  id: 'aurora-lounge-chair',
  name: 'Aurora Lounge Chair',
  category: 'Furniture',
  price: 249,
  rating: 4,
  imageSeed: 'aurora-lounge-chair',
  isDirectPay: true,
}

describe('ProductCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents()
  })

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductCard)
    fixture.componentInstance.product = mockProduct
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render the product category, name and formatted price', () => {
    const fixture = TestBed.createComponent(ProductCard)
    fixture.componentInstance.product = mockProduct
    fixture.detectChanges()
    const compiled = fixture.nativeElement as HTMLElement

    expect(compiled.querySelector('.ProductCardCategory')?.textContent).toBe('Furniture')
    expect(compiled.querySelector('.ProductCardName')?.textContent).toBe('Aurora Lounge Chair')
    expect(compiled.querySelector('.ProductCardPrice')?.textContent).toContain('249')
  })

  it('should show a rounded number of filled rating stars', () => {
    const fixture = TestBed.createComponent(ProductCard)
    fixture.componentInstance.product = mockProduct
    fixture.detectChanges()

    expect((fixture.nativeElement as HTMLElement).querySelectorAll('.ProductCardRating GoogleSymbol').length).toBe(5)
    expect(
      (fixture.nativeElement as HTMLElement).querySelector('.ProductCardRating')?.getAttribute('aria-label'),
    ).toBe('4 out of 5 stars')
  })
})
