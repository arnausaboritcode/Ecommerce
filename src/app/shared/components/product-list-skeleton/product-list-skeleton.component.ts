import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './product-list-skeleton.component.html',
  styleUrl: './product-list-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListSkeletonComponent {
  constructor() {}
}
