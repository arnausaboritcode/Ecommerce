import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../features/product/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductTitleResolver implements Resolve<string> {
  public productService = inject(ProductService);
  public $product = this.productService.$product;
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    /* const productId: string = route.paramMap.get('id') || '';
    this.productService.getProductById(+productId);
    return this.$product().title; */
    return 'Hola';
  }
}
