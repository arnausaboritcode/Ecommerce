import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable, pluck, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../features/product/services/product.service';
import { ProductDTO } from '../models/productDTO';
import { AutoDestroyService } from '../services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class ProductTitleResolver implements Resolve<string> {
  public productService = inject(ProductService);
  public $product = this.productService.$product;
  constructor(private http: HttpClient, private destroy$: AutoDestroyService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    const productId: string = route.paramMap.get('id') || '';
    return this.http
      .get<ProductDTO>(`${environment.BASE_API_URL}/products/${productId}`)
      .pipe(
        takeUntil(this.destroy$),
        pluck('title'),
        map((title) => {
          return title ? `WearAPair - ${title}` : 'WearAPair - Product';
        })
      );
  }
}
