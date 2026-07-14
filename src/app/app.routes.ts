import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/home/home').then(m => m.Home),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('../pages/product/product').then(m => m.ProductPage),
  },
]
