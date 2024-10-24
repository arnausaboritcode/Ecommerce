import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oldprice',
  standalone: true,
})
export class OldpricePipe implements PipeTransform {
  transform(price: number): number {
    return price - price * 0.25;
  }
}
