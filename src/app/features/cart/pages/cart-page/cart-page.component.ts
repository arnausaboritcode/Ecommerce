import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductDTO } from '../../../../core/models/productDTO';
import { OldpricePipe } from '../../../../shared/pipes/oldprice.pipe';
import { TitlelimitPipe } from '../../../../shared/pipes/titlelimit.pipe';
import { WordcasePipe } from '../../../../shared/pipes/wordcase.pipe';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    OldpricePipe,
    WordcasePipe,
    TitlelimitPipe,
    RouterModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPageComponent {
  public productService = inject(ProductService);
  public $cartProducts: Signal<ProductDTO[]> =
    this.productService.$cartProducts;
  public $totalCartPrice: Signal<number> = this.productService.$totalCartPrice;

  constructor(private route: Router) {}

  decreaseQuantityHandler(product: ProductDTO): void {
    this.productService.decreaseQuantity(product);
  }

  increaseQuantityHandler(product: ProductDTO): void {
    this.productService.increaseQuantity(product);
  }
}
