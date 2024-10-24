import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../features/product/services/product.service';
import { AutoDestroyService } from '../../../services/utils/auto-destroy.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public query: string = '';
  public destroyService$ = inject(AutoDestroyService);
  public productService = inject(ProductService);
  public $searchResults = this.productService.$searchResults;

  constructor() {}

  subscribeToInputChanges(): void {
    this.productService.setQueryString(this.query);
    this.productService.searchProducts();
  }
}
