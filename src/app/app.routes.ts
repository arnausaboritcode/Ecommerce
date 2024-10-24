import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/product/product.routes').then(
            (m) => m.PRODUCT_ROUTES
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'products' },
];
