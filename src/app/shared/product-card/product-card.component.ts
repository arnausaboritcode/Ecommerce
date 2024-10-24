import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductDTO } from '../../core/models/productDTO';
import { OldpricePipe } from '../pipes/oldprice.pipe';
import { TitlelimitPipe } from '../pipes/titlelimit.pipe';
import { WordcasePipe } from '../pipes/wordcase.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, WordcasePipe, TitlelimitPipe, OldpricePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true }) product: ProductDTO = {} as ProductDTO;

  constructor() {}
}
