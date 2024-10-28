import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ProductDTO } from '../../../../core/models/productDTO';
import { AutoDestroyService } from '../../../../core/services/utils/auto-destroy.service';
import { OldpricePipe } from '../../../../shared/pipes/oldprice.pipe';
import { TitlelimitPipe } from '../../../../shared/pipes/titlelimit.pipe';
import { WordcasePipe } from '../../../../shared/pipes/wordcase.pipe';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, WordcasePipe, TitlelimitPipe, OldpricePipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent implements OnInit {
  public productService = inject(ProductService);
  public $product: Signal<ProductDTO> = this.productService.$product;
  public $loading: Signal<boolean> = this.productService.$loading;
  constructor(
    private route: ActivatedRoute,
    private destroyService$: AutoDestroyService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.route.params
      .pipe(takeUntil(this.destroyService$))
      .subscribe((params) => {
        this.productService.getProductById(+params['id']);
      });
  }

  addToCartHandler(product: ProductDTO): void {
    this.productService.addProduct(product);
  }
}
