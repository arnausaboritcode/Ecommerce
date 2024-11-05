import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-cart-success-page',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './cart-success-page.component.html',
  styleUrl: './cart-success-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSuccessPageComponent implements OnInit {
  public productService = inject(ProductService);
  constructor() {}

  ngOnInit(): void {
    this.productService.resetCart();
  }
}
