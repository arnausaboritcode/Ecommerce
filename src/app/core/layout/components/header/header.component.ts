import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../../features/product/services/product.service';
import { ProductDTO } from '../../../models/productDTO';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public query: string = '';
  public productService = inject(ProductService);
  public $searchResults: Signal<ProductDTO[] | undefined> =
    this.productService.$searchResults;
  public $cartItemsCount: Signal<number> = this.productService.$cartItemsCount;

  public showSearchResults: boolean;
  public showMobileNav: boolean;
  public showMobileSearchResults: boolean;

  constructor() {
    this.showSearchResults = false;
    this.showMobileNav = false;
    this.showMobileSearchResults = false;
  }

  ngOnInit(): void {
    this.productService.getAllProducts();
  }

  subscribeToInputChanges(): void {
    this.productService.setQueryString(this.query);
  }

  searchResultsUpdate(): void {
    this.showSearchResults = false;
    this.showMobileNav = false;
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
