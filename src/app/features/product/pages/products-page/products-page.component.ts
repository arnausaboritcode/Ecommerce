import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { ProductDTO } from '../../../../core/models/productDTO';
import { ProductListComponent } from '../../../../shared/product-list/product-list.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPageComponent implements OnInit {
  public productService = inject(ProductService);
  public $products: Signal<ProductDTO[]> = this.productService.$products;

  constructor() {}

  ngOnInit(): void {
    this.productService.getProducts();
  }
}
