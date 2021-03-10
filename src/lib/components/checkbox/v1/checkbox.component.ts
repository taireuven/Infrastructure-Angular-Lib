//use ex:   <moh-check-box text="הנני מצהיר שכל הפרטים ששלחתי הינם נכונים"></moh-check-box>
//text: string;
import { Component, OnInit, Input, ViewEncapsulation, forwardRef, ElementRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { CheckboxBase } from '../base/checkbox.base';

/**
 * The checkbox component
 *
 * ### Usage
 * ```html
   <!-- basic checkbox -->
   <moh-checkbox textKey="demoFormCheckbox"></moh-checkbox>

   <!-- checkbox with * -->
   <moh-checkbox textKey="demoFormCheckbox" [MarkAsRequired]="true"></moh-checkbox>
 * ```
 * <example-url>../screenshots/components/v1/checkbox.png</example-url>
*/
@Component({
  selector: 'moh-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => CheckboxComponent) },
  { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => CheckboxComponent) }]  
})
export class CheckboxComponent extends CheckboxBase {
  
  constructor(injector: Injector) {
    super(injector);
  }
}
