import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { ProductDTO } from '../../../../core/models/productDTO';
import { OldpricePipe } from '../../../../shared/pipes/oldprice.pipe';
import { TitlelimitPipe } from '../../../../shared/pipes/titlelimit.pipe';
import { WordcasePipe } from '../../../../shared/pipes/wordcase.pipe';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, OldpricePipe, WordcasePipe, TitlelimitPipe],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  public productService = inject(ProductService);
  public $cartProducts: Signal<ProductDTO[]> =
    this.productService.$cartProducts;

  constructor() {}
}
