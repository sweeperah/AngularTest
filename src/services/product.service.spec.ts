import { TestBed } from '@angular/core/testing'
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing'
import { Product, ProductService } from './product.service'

const mockProduct: Product = {
  id: 'aurora-lounge-chair',
  name: 'Aurora Lounge Chair',
  category: 'Furniture',
  price: 249,
  rating: 4,
  imageSeed: 'aurora-lounge-chair',
  isDirectPay: true,
}

describe('ProductService', () => {
  let service: ProductService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    })
    service = TestBed.inject(ProductService)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('getProducts should GET the products list with no search param', () => {
    let result: Product[] | undefined

    service.getProducts().subscribe(products => (result = products))

    const request = httpTestingController.expectOne(
      request => request.url.endsWith('/products') && !request.params.has('search'),
    )

    expect(request.request.method).toBe('GET')
    request.flush([mockProduct])

    expect(result).toEqual([mockProduct])
  })

  it('getProduct should GET the product by id', () => {
    let result: Product | undefined

    service.getProduct('aurora-lounge-chair').subscribe(product => (result = product))

    const request = httpTestingController.expectOne(
      request => request.url.endsWith('/products/aurora-lounge-chair'),
    )

    expect(request.request.method).toBe('GET')
    request.flush(mockProduct)

    expect(result).toEqual(mockProduct)
  })

  it('getProduct should resolve to undefined when the request fails', () => {
    let result: Product | undefined = mockProduct

    service.getProduct('does-not-exist').subscribe(product => (result = product))

    const request = httpTestingController.expectOne(request => request.url.endsWith('/products/does-not-exist'))

    request.flush({ message: 'Product not found' }, { status: 404, statusText: 'Not Found' })

    expect(result).toBeUndefined()
  })

  it('searchProducts should GET with a search query param when a query is given', () => {
    let result: Product[] | undefined

    service.searchProducts('lounge').subscribe(products => (result = products))

    const request = httpTestingController.expectOne(
      request => request.url.endsWith('/products') && request.params.get('search') === 'lounge',
    )

    expect(request.request.method).toBe('GET')
    request.flush([mockProduct])

    expect(result).toEqual([mockProduct])
  })

  it('searchProducts should GET without a search query param when the query is empty', () => {
    let result: Product[] | undefined

    service.searchProducts('').subscribe(products => (result = products))

    const request = httpTestingController.expectOne(
      request => request.url.endsWith('/products') && !request.params.has('search'),
    )

    request.flush([mockProduct])

    expect(result).toEqual([mockProduct])
  })
})
