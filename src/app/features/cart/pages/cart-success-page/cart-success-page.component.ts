import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-success-page',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './cart-success-page.component.html',
  styleUrl: './cart-success-page.component.scss',
})
export class CartSuccessPageComponent {
  constructor() {}
}