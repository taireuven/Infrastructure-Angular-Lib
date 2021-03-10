import { Component, ViewEncapsulation, forwardRef, Injector, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CheckboxGroupBase } from '../base/checkbox-group.base';

/**
 * A group of checkBoxes.
 *
 * ### Usage
  ```html

   <!-- basic checkbox-group -->
   <moh-checkbox-group [options]="colorsList" displayField="text" formControlName="checkbox"></moh-checkbox-group>

   <!-- checkbox-group with some Inputs -->
   <moh-checkbox-group [options]="colorsList" displayField="text" formControlName="checkbox"
                         layout="row" [MarkAsRequired]=true labelAbove="false"></moh-checkbox-group>

  ```
 * <example-url>../screenshots/components/v1/checkbox-group.png</example-url>
 */

@Component({
  selector: 'moh-checkbox-group',
  templateUrl: './checkbox-group.v2.component.html',
  styleUrls: ['./checkbox-group.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupV2Component), multi: true
    }]
})
export class CheckboxGroupV2Component extends CheckboxGroupBase {

  /**
  * The of rows of checkboxes. a positive number. 
  */
  _rows: number = 10;
  get rows(): number {
    return this._rows;
  }
  @Input() set rows(value: number) {
    if (value) {
      this._rows = value < 1 ? 1 : Math.round(value);
    }
  }

  constructor(injector: Injector) {
    super(injector);
  }
}
