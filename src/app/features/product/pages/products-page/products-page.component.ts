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
import { distinctUntilChanged, takeUntil } from 'rxjs';
import { ProductDTO } from '../../../../core/models/productDTO';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { WordcasePipe } from '../../../../shared/pipes/wordcase.pipe';
import { ProductListComponent } from '../../../../shared/product-list/product-list.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductListComponent, ReactiveFormsModule, WordcasePipe],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  public productService = inject(ProductService);
  public $products: Signal<ProductDTO[]> = this.productService.$products;
  public $categories: Signal<string[]> = this.productService.$categories;

  filterForm: FormGroup;
  sortBy: FormControl;
  categories: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private destroy$: AutoDestroyService
  ) {
    this.sortBy = new FormControl('asc');
    this.categories = new FormControl('');

    this.filterForm = this.formBuilder.group({
      sortBy: this.sortBy,
      categories: this.categories,
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
      .subscribe((filters) => {
        this.productService.getProducts(filters);
      });
  }
}
