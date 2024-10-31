import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../features/product/services/product.service';
import { ProductDTO } from '../../../models/productDTO';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public query: string = '';
  public productService = inject(ProductService);
  public $searchResults: Signal<ProductDTO[] | undefined> =
    this.productService.$searchResults;
  public $cartItemsCount: Signal<number> = this.productService.$cartItemsCount;

  showSearchResults: boolean = false;
  showMobileNav: boolean = false;
  showMobileSearchResults: boolean = false;

  constructor() {}

  subscribeToInputChanges(): void {
    this.productService.setQueryString(this.query);
  }

  searchResultsUpdate(): void {
    this.showSearchResults = false;
    this.query = '';
    this.subscribeToInputChanges();
  }

  onBlur(): void {
    setTimeout(() => {
      this.showSearchResults = false;
      this.showMobileSearchResults = false;
      this.showMobileNav = false;
    }, 200);
  }
}
