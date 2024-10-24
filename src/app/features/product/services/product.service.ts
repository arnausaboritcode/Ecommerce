import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ProductDTO } from '../../../core/models/productDTO';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public $products: WritableSignal<ProductDTO[]> = signal([]);
  public $product: WritableSignal<ProductDTO> = signal({} as ProductDTO);
  public $queryString: WritableSignal<string> = signal('');
  public $searchResults = computed(() => {
    if (this.$queryString().length) {
      return this.$products().filter((product) =>
        product.title.toLowerCase().includes(this.$queryString().toLowerCase())
      );
    }
    return;
  });

  public $cartProducts: WritableSignal<ProductDTO[]> = signal([]);
  public $cartItemsCount = computed(() => this.$cartProducts().length);
  public $loading: WritableSignal<boolean> = signal(false);

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

  addProduct(product: ProductDTO): void {
    this.$cartProducts.set([...this.$cartProducts(), product]);
  }

  getProductById(id: number): void {
    this.$loading.set(true);
    this.http
      .get<ProductDTO>(`${environment.BASE_API_URL}/products/${id}`)
      .pipe(
        takeUntil(this.destroyService$),
        finalize(() => this.$loading.set(false))
      )
      .subscribe((product) => this.$product.set(product));
  }
}
