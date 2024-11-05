import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-detail-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './product-detail-skeleton.component.html',
  styleUrl: './product-detail-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailSkeletonComponent {}
