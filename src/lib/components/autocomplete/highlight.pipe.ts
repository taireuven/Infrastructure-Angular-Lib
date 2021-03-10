import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'mohHighlight'
})
export class MohHighlightPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer){}
  transform(text: string, search:string): string {
    if (search){
      const pattern = search
        .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        .split(' ')
        .filter(t => t.length > 0)
        .join('|');
      const regex = new RegExp(pattern, 'gi');
      return text.replace(regex, match => `<span class="moh-bold highlighted">${match}</span>`)
    } else {
      return text;
    }
  }

}
