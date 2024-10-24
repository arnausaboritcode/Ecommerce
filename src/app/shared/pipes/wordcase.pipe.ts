import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordcase',
  standalone: true,
})
export class WordcasePipe implements PipeTransform {
  transform(word: string): string {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  }
}
