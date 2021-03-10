// use ex:   <moh-radiobutton-group [options]="items" displayField="text"></moh-radiobutton-group>
// options: any[];
// displayField?:string;
import { Component, ViewEncapsulation, forwardRef, Injector, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadiobuttonGroupBase } from '../base/radiobutton-group.base';

/**
 * A group of radio buttons.
 *
 * ### Usage
  ```html

   <!-- basic radiobutton-group -->
   <moh-radiobutton-group [options]="colorsList" displayField="text" formControlName="radio"></moh-radiobutton-group>

   <!-- radiobutton-group with some Inputs -->
   <moh-radiobutton-group [options]="colorsList" displayField="text" formControlName="radio"
                         layout="row" [MarkAsRequired]=true labelAbove="false"></moh-radiobutton-group>

  ```
 * <example-url>../screenshots/components/v2/radiobutton-group.png</example-url>
 */
@Component({
  selector: 'moh-radiobutton-group',
  templateUrl: './radiobutton-group.v2.component.html',
  styleUrls: ['./radiobutton-group.v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadiobuttonGroupV2Component), multi: true
    }]
})
export class RadiobuttonGroupV2Component extends RadiobuttonGroupBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
