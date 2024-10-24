import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlelimit',
  standalone: true,
})
export class TitlelimitPipe implements PipeTransform {
  transform(title: string): string {
    return `${title.substring(0, 20)}`;
  }
}
