import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { finalize, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FiltersDTO } from '../../../core/models/filtersDTO';
import { ProductDTO } from '../../../core/models/productDTO';
import { SnackBarService } from '../../../core/services/common/snack-bar.service';
import { AutoDestroyService } from '../../../core/services/utils/auto-destroy.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public $allProducts: WritableSignal<ProductDTO[]> = signal([]);
  public $products: WritableSignal<ProductDTO[]> = signal([]);
  public $product: WritableSignal<ProductDTO> = signal({} as ProductDTO);
  public $categories: WritableSignal<string[]> = signal([]);
  public $cartProducts: WritableSignal<ProductDTO[]> = signal([]);
  public $queryString: WritableSignal<string> = signal('');
  public $loading: WritableSignal<boolean> = signal(false);

  public $searchResults = computed(() => {
    if (this.$queryString().length) {
      return this.$allProducts().filter((product) =>
        product.title.toLowerCase().includes(this.$queryString().toLowerCase())
      );
    }
    return;
  });

  public $cartItemsCount = computed(() => this.$cartProducts().length);
  public $totalCartPrice = computed(() => {
    let total = 0;
    this.$cartProducts().forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  });

  constructor(
    private http: HttpClient,
    private destroyService$: AutoDestroyService,
    private snackBarService: SnackBarService
  ) {}

  getProducts(): void {
    this.$loading.set(true);

    this.http
      .get<ProductDTO[]>(`${environment.BASE_API_URL}/products`)
      .pipe(
        takeUntil(this.destroyService$),
        finalize(() => this.$loading.set(false))
      )
      .subscribe((products) => {
        this.$allProducts.set(products);
        this.$products.set(products);
      });
  }

  getFilteredProducts(filters: FiltersDTO): void {
    this.$loading.set(true);

    let url = `${environment.BASE_API_URL}/products`;

    if (filters?.category) {
      url += `/category/${filters.category}`;
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
      .subscribe((products) => {
        this.$products.set(products);
      });
  }

  setQueryString(query: string) {
    this.$queryString.set(query);
  }

  addProduct(product: ProductDTO): void {
    const existingProduct = this.$cartProducts().find(
      (p) => p.id === product.id
    );

    if (existingProduct) {
      this.increaseQuantity(existingProduct);
    } else {
      product.quantity = 1;
      this.$cartProducts.set([...this.$cartProducts(), product]);
      this.snackBarService.showSuccess('Product added to cart');
    }
  }

  increaseQuantity(product: ProductDTO): void {
    product.quantity++;
    this.$cartProducts.update((cart) => [...cart]);
    this.snackBarService.showSuccess('Product quantity increased');
  }

  decreaseQuantity(product: ProductDTO): void {
    if (product.quantity === 1) {
      return this.removeProduct(product);
    }
    product.quantity--;
    this.$cartProducts.update((cart) => [...cart]);
    this.snackBarService.showSuccess('Product quantity decreased');
  }

  inCart(product: ProductDTO): boolean {
    return this.$cartProducts().some(
      (cartProduct) => cartProduct.id === product.id
    );
  }

  getMatchedProduct(product: ProductDTO): ProductDTO {
    return (
      this.$cartProducts().find(
        (cartProduct) => cartProduct.id === product.id
      ) ?? product
    );
  }

  removeProduct(product: ProductDTO): void {
    this.$cartProducts.update((cart) => {
      return cart.filter((p) => p.id !== product.id);
    });
    this.snackBarService.showSuccess('Product removed from cart');
  }

  getProductById(id: number): void {
    this.$loading.set(true);
    this.http
      .get<ProductDTO>(`${environment.BASE_API_URL}/products/${id}`)
      .pipe(
        takeUntil(this.destroyService$),
        finalize(() => this.$loading.set(false))
      )
      .subscribe((product) => {
        this.$product.set(product);
        /*  const cartProduct = this.$cartProducts().find(
          (p) => p.id === product.id
        );
        product.quantity = cartProduct ? cartProduct.quantity : 0; */
      });
  }

  getCategories(): void {
    this.$loading.set(true);
    this.http
      .get<string[]>(`${environment.BASE_API_URL}/products/categories`)
      .pipe(
        takeUntil(this.destroyService$),
        finalize(() => this.$loading.set(false))
      )
      .subscribe((categories) => this.$categories.set(categories));
  }
}
