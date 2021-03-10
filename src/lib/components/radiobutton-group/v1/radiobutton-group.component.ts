// use ex:   <moh-radiobutton-group [options]="items" displayField="text"></moh-radiobutton-group>
// options: any[];
// displayField?:string;
import { Component, ViewEncapsulation, forwardRef, Injector} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadiobuttonGroupBase } from '../base/radiobutton-group.base';

/**
 * A group of radio buttons.
 *
 * ### Usage
 * ```html

   <!-- basic radiobutton-group -->
   <moh-radiobutton-group [options]="colorsList" displayField="text" formControlName="radio"></moh-radiobutton-group>

   <!-- radiobutton-group with some Inputs -->
   <moh-radiobutton-group [options]="colorsList" displayField="text" formControlName="radio"
                         layout="row" [MarkAsRequired]=true labelAbove="false"></moh-radiobutton-group>

 * ```
 * <example-url>../screenshots/components/v1/radiobutton-group.png</example-url>
 */
@Component({
  selector: 'moh-radiobutton-group',
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonGroupComponent), multi: true
    }]
})
export class RadiobuttonGroupComponent extends RadiobuttonGroupBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
