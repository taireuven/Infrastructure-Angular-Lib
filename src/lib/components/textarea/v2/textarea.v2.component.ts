import { Component, OnInit, ViewEncapsulation, forwardRef, Injector, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { TextareaBase } from '../base/textarea.base';
import { Observable } from 'rxjs';
/**
* The textarea component is for displaying a multi line textbox input.
*
* ### Usage
* #### HTML
 ```html

  <!-- basic textarea -->
  <moh-textarea formControlName="textarea"></moh-textarea>

  <!-- textarea with inputs -->
  <moh-textarea formControlName="textarea" [maxChars]="100"
                [markAsInvalid]="demoForm['submitted'] && !(demoForm.controls.textarea.valid)"></moh-textarea>

 ```
* <example-url>../screenshots/components/v2/text-area.png</example-url>
*/
@Component({
  selector: 'moh-textarea',
  templateUrl: './textarea.v2.component.html',
  styleUrls: ['./textarea.v2.component.scss', '../../../../styles/inputs.v2.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TextareaV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TextareaV2Component) }]
})
export class TextareaV2Component extends TextareaBase {
  
  constructor(injector: Injector) {
    super(injector);
  }
}
