import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FiltersDTO } from '../../../core/models/filtersDTO';
import { ProductDTO } from '../../../core/models/productDTO';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public $products: WritableSignal<ProductDTO[]> = signal([]);
  public $product: WritableSignal<ProductDTO> = signal({} as ProductDTO);
  public $categories: WritableSignal<string[]> = signal([]);
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
  public $totalCartPrice = computed(() => {
    let total = 0;
    this.$cartProducts().forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  });

  public $loading: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private destroyService$: AutoDestroyService
  ) {}

  getProducts(filters?: FiltersDTO): void {
    this.$loading.set(true);

    let url = `${environment.BASE_API_URL}/products`;

    if (filters?.categories) {
      url += `/category/${filters.categories}`;
    }

    if (filters?.sortBy) {
      url += `?sort=${filters.sortBy}`;
    }

    this.http
      .get<ProductDTO[]>(url)
      .pipe(
        takeUntil(this.destroyService$),
        finalize(() => this.$loading.set(false))
      )
      .subscribe((products) => this.$products.set(products));
  }

  setQueryString(query: string) {
    this.$queryString.set(query);
  }

  addProduct(product: ProductDTO): void {
    if (!this.$cartProducts().find((p) => p.id === product.id)) {
      product.quantity = 1;
      this.$cartProducts.set([...this.$cartProducts(), product]);
    } else {
      this.increaseQuantity(product);
    }
  }

  increaseQuantity(product: ProductDTO): void {
    product.quantity++;
    this.$cartProducts.update((cart) => [...cart]);
  }

  decreaseQuantity(product: ProductDTO): void {
    if (product.quantity === 1) {
      return this.removeProduct(product);
    }
    product.quantity--;
    this.$cartProducts.update((cart) => [...cart]);
  }

  removeProduct(product: ProductDTO): void {
    this.$cartProducts.update((cart) => {
      return cart.filter((p) => p.id !== product.id);
    });
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

  getCategories(): void {
    this.http
      .get<string[]>(`${environment.BASE_API_URL}/products/categories`)
      .pipe(takeUntil(this.destroyService$))
      .subscribe((categories) => this.$categories.set(categories));
  }
}
