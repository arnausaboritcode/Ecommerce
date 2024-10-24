import { Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const CART_ROUTES: Routes = [
  {
    path: '',
    component: CartPageComponent,
    title: 'Cart',
  },
];
