import { Component, Input } from '@angular/core';
import { ProductDTO } from '../../../core/models/productDTO';

@Component({
  selector: 'app-product-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './product-list-skeleton.component.html',
  styleUrl: './product-list-skeleton.component.scss',
})
export class ProductListSkeletonComponent {
  @Input({ required: true }) products!: ProductDTO[];

  constructor() {}
}
