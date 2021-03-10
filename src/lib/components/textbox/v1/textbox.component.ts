import { Component, ViewEncapsulation, forwardRef, Injector } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextboxBase } from '../base/textbox.base';

/**
 * The textbox component
 *
 * ### Usage
 * ```html

   <!-- basic textbox -->
   <moh-textbox formControlName="firstName"></moh-textbox>

   <!-- textbox with inputs -->
   <moh-textbox formControlName="firstName" [placeholderKey]="'firstName'" [type]="'text'" [maxlength]="3" (blur)="onBlur()" [MarkAsRequired]="true"></moh-textbox>

  ```
*
* #### TS
* ```typescript

  onBlur () {
    alert('textbox blur')
  }
 ```
*
 * <example-url>../screenshots/components/v1/textbox.png</example-url>
*/
@Component({
  selector: 'moh-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TextboxComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TextboxComponent) }]
})
export class TextboxComponent extends TextboxBase {

  constructor(injector: Injector) {
    super(injector);
  }
}
