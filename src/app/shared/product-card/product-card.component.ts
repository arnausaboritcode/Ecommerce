import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductDTO } from '../../core/models/productDTO';
import { ProductService } from '../../features/product/services/product.service';
import { OldpricePipe } from '../pipes/oldprice.pipe';
import { TitlelimitPipe } from '../pipes/titlelimit.pipe';
import { WordcasePipe } from '../pipes/wordcase.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    WordcasePipe,
    TitlelimitPipe,
    OldpricePipe,
    RouterModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: ProductDTO;
  public productService = inject(ProductService);
  public $cartProducts: Signal<ProductDTO[]> =
    this.productService.$cartProducts;

  addToCartHandler(product: ProductDTO): void {
    this.productService.addProduct(product);
  }

  decreaseQuantityHandler(product: ProductDTO): void {
    this.productService.decreaseQuantity(product);
  }

  increaseQuantityHandler(product: ProductDTO): void {
    this.productService.increaseQuantity(product);
  }

  inCartHandler(product: ProductDTO): boolean {
    return this.productService.inCart(product);
  }
}
