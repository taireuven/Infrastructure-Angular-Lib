import { Component, ViewEncapsulation, forwardRef, Injector, Input, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TextboxBase } from '../base/textbox.base';
import { Observable } from 'rxjs';
/**
 * The textbox component
 *
 * ### Usage
  ```html

   <!-- basic textbox -->
   <moh-textbox formControlName="firstName"></moh-textbox>

   <!-- textbox with inputs -->
   <moh-textbox formControlName="firstName" placeholderKey="firstName" type="text" [MarkAsRequired]=true
                [markAsInvalid]="demoForm['submitted'] && !(demoForm.controls.firstName.valid)"
                [isDisabled]="false" [type]="'text'" [maxlength]="3" (blur)="onBlur()"></moh-textbox>

  ```
*
* #### TS
 ```typescript

  onBlur () {
    alert('textbox blur')
  }
 ```
*
 * <example-url>../screenshots/components/v2/textbox.png</example-url>
*/
@Component({
  selector: 'moh-textbox',
  templateUrl: './textbox.v2.component.html',
  styleUrls: ['./textbox.v2.component.scss', '../../../../styles/inputs.v2.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TextboxV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TextboxV2Component) }]
})
export class TextboxV2Component extends TextboxBase {

  ///**
  //* When no label - Whether to display the placeholder on blur too.
  //*/
  //@Input() displayPlaceholderOnBlur: boolean = false;
  
  constructor(injector: Injector) {
    super(injector);
  }
}
