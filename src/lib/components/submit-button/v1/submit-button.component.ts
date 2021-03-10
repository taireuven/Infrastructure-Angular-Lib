import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { SubmitButtonBase } from '../base/submit-button.base';

/**
 * moh-submit-button provides button with functionality for type submit.
 *
 * ### Usage
 * ```html
   <!-- basic submit-button -->
   <moh-submit-button text="שלח בקשה" [control]="demoForm" (onButtonClick)="sendReq()"></moh-submit-button>

   <!-- submit-button with some inputs -->
   <moh-submit-button textKey="sendRequest" [control]="demoForm" iconName="keyboard_arrow_left"
                      (onButtonClick)="sendReq()" [validateInvisibleRecaptcha]="true"></moh-submit-button>

 * ```
 * <example-url>../screenshots/components/v1/submit-button.png</example-url>
*/
@Component({
  selector: 'moh-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SubmitButtonComponent extends SubmitButtonBase {
  constructor(injector: Injector) {
    super(injector);
  }
}
