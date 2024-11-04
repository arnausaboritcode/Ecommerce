import { Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartSuccessPageComponent } from './pages/cart-success-page/cart-success-page.component';

export const CART_ROUTES: Routes = [
  {
    path: '',
    component: CartPageComponent,
    title: 'Cart',
  },
  {
    path: 'success',
    component: CartSuccessPageComponent,
    title: 'Cart Success',
  },
];
