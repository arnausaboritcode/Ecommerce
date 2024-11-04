import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { FiltersDTO } from '../../../../core/models/filtersDTO';
import { ProductDTO } from '../../../../core/models/productDTO';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { ProductListSkeletonComponent } from '../../../../shared/components/product-list-skeleton/product-list-skeleton.component';
import { ProductListComponent } from '../../../../shared/components/product-list/product-list.component';
import { WordcasePipe } from '../../../../shared/pipes/wordcase.pipe';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    ProductListComponent,
    ReactiveFormsModule,
    WordcasePipe,
    ProductListSkeletonComponent,
    InfiniteScrollDirective,
    NgOptimizedImage,
  ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  public productService = inject(ProductService);
  public $products: Signal<ProductDTO[]> = this.productService.$products;
  public $allproducts: Signal<ProductDTO[]> = this.productService.$allProducts;
  public $loading: Signal<boolean> = this.productService.$loading;
  public $categories: Signal<string[]> = this.productService.$categories;

  filterForm: FormGroup;
  sortBy: FormControl;
  category: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private destroy$: AutoDestroyService
  ) {
    this.sortBy = new FormControl('asc');
    this.category = new FormControl('');

    this.filterForm = this.formBuilder.group({
      sortBy: this.sortBy,
      category: this.category,
    });
  }

  ngOnInit(): void {
    this.productService.getProducts();
    this.productService.getCategories();
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged())
      .subscribe((filters: FiltersDTO) => {
        this.productService.getProducts(filters);
      });
  }
}
