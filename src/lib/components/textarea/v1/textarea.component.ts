import { Component, Input, ViewEncapsulation, ElementRef, forwardRef, Injector, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { TextareaBase } from '../base/textarea.base';
/**
* The textarea component is for displaying a multi line textbox input.
*
* ### Usage
* #### HTML
* ```html

  <!-- basic textarea -->
  <moh-textarea formControlName="textarea"></moh-textarea>

  <!-- textarea with inputs -->
  <moh-textarea formControlName="textarea" [maxChars]="100" [minRows]="2" [maxRows]="4"></moh-textarea>

 ```
* <example-url>../screenshots/components/v1/textarea.png</example-url>
*/
@Component({
  selector: 'moh-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TextareaComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TextareaComponent) }]
})
export class TextareaComponent extends TextareaBase {

  /**
  * Numbers of rows to set minimum textarea height.
  */
  @Input() minRows: number = 3;
  /**
  * Numbers of rows to set maximum textarea height.
  */
  @Input() maxRows: number = 10;
  
  constructor(injector: Injector) {
    super(injector);
  }
}
