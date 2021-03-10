import { Directive, HostListener } from '@angular/core';
import { BaseAbstractControl } from '../components/base/base-abstract-control';

@Directive({
  selector: '[mohNumbersOnly]'
})
export class NumbersOnlyDirective {
  
  private regex: RegExp = new RegExp(/^\d*[0-9]\d*$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'Delete', 'ArrowRight', 'ArrowLeft'];

  constructor() { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (event.key && !String(event.key).match(this.regex)) {
      event.preventDefault();
    }
  }
}

