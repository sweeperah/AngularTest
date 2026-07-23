import { Routes } from '@angular/router'
import Home from '../pages/home/home'

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'product/:id',
    title: 'Product Details',
    loadComponent: () => import('../pages/product/product'),
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () => import('../pages/notFound/notFound'),
  },
]
