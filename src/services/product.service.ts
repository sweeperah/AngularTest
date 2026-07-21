import { Service } from '@angular/core'
import { PRODUCTS } from './product.data'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  rating: number
  imageSeed: string
}

@Service()
export class ProductService {
  getProducts(): Product[] {
    return PRODUCTS
  }

  getProduct(id: string): Product | undefined {
    return PRODUCTS.find(product => product.id === id)
  }

  searchProducts(query: string): Product[] {
    if (!query) {
      return PRODUCTS
    }

    const normalizedQuery = query.toLowerCase()

    return PRODUCTS.filter(product => product.name.toLowerCase().includes(normalizedQuery))
  }
}
