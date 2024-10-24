import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordcase',
  standalone: true,
})
export class WordcasePipe implements PipeTransform {
  transform(title: string): string {
    return `${title.charAt(0).toUpperCase()}${title.slice(1)}`;
  }
}
