import { Service, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, catchError, of } from 'rxjs'
import { environment } from '../environments/environment'
import type { Product } from 'shared-types'

export type { Product }

export interface ApplicationData {
  firstName: string
  lastName: string
  email: string
}

@Service()
export class ProductService {
  private readonly http = inject(HttpClient)
  private readonly baseUrl = `${environment.apiBaseUrl}/products`

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(catchError(() => of(undefined)))
  }

  searchProducts(query: string): Observable<Product[]> {
    const params = query ? new HttpParams().set('search', query) : undefined

    return this.http.get<Product[]>(this.baseUrl, { params })
  }

  submitApplication(applicationData: ApplicationData): void {
    console.log('applicationData', applicationData) // delete me

    // const { firstName, lastName, email } = applicationData
  }
}
