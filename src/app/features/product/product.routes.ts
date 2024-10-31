import { Routes } from '@angular/router';
import { ProductTitleResolver } from '../../core/resolvers/product-title.resolver';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    title: 'WearAPair - Products',
  },
  {
    path: ':id',
    component: ProductDetailPageComponent,
    title: ProductTitleResolver,
  },
];
