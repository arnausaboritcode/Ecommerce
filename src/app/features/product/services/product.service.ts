import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductDTO } from '../../../core/models/productDTO';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public $products: WritableSignal<ProductDTO[]> = signal([]);
  public $queryString: WritableSignal<string> = signal('');
  public $searchResults: WritableSignal<ProductDTO[]> = signal([]);

  constructor(
    private http: HttpClient,
    private destroyService$: AutoDestroyService
  ) {}

  getProducts(): void {
    this.http
      .get<ProductDTO[]>(`${environment.BASE_API_URL}/products`)
      .pipe(takeUntil(this.destroyService$))
      .subscribe((products) => this.$products.set(products));
  }

  setQueryString(query: string) {
    this.$queryString.set(query);
  }

  searchProducts(): void {
    const filteredProducts = this.$products().filter((product) =>
      product.title.toLowerCase().includes(this.$queryString().toLowerCase())
    );
    this.$searchResults.set(filteredProducts);
  }
}
