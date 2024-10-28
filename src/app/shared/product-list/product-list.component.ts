import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductDTO } from '../../core/models/productDTO';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input({ required: true }) products!: ProductDTO[];

  constructor() {}
}
