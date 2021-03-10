import { Component, ViewEncapsulation, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxGroupBase } from '../base/checkbox-group.base';

/**
 * A group of checkBoxes.
 *
 * ### Usage
 * ```html

   <!-- basic checkbox-group -->
   <moh-checkbox-group [options]="colorsList" displayField="text" formControlName="checkbox"></moh-radiobutton-group>

   <!-- checkbox-group with some Inputs -->
   <moh-checkbox-group [options]="colorsList" displayField="text" formControlName="checkbox"
                         layout="row" [MarkAsRequired]=true labelAbove="false"></moh-radiobutton-group>

 * ```
 * <example-url>../screenshots/components/v1/checkbox-group.png</example-url>
 */

@Component({
  selector: 'moh-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent), multi: true
    }]
})
export class CheckboxGroupComponent extends CheckboxGroupBase {

  constructor(injector: Injector) {
    super(injector);
  }

}
