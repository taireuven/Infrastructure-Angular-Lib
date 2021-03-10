import { Component, Injector, ViewEncapsulation, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CheckboxBase } from '../base/checkbox.base';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

/**
 * The checkbox component
 *
 * ### Usage
  ```html
   <!-- basic checkbox -->
   <moh-checkbox textKey="demoFormCheckbox"></moh-checkbox>

   <!-- checkbox with * -->
   <moh-checkbox textKey="demoFormCheckbox" [MarkAsRequired]="true"></moh-checkbox>
  ```
 * <example-url>../screenshots/components/v2/checkbox.png</example-url>
*/
@Component({
  selector: 'moh-checkbox',
  templateUrl: './checkbox.v2.component.html',
  styleUrls: ['./checkbox.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => CheckboxV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => CheckboxV2Component) }]
})
export class CheckboxV2Component extends CheckboxBase {

  constructor(injector: Injector) {
    super(injector);
  }
}
