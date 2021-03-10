import { Component, Injector, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { PasswordBase } from '../base/password.base';

/**
 * The password component provide textbox type password with more password functionality.
 *
 * ### Usage
 * ```html

   <!-- basic password -->
   <moh-password formControlName="password"></moh-password>

   <!-- password with some inputs -->
   <moh-password formControlName="password" [MarkAsRequired]="true" [maxlength]="10"></moh-password>

  ```
 *
 * <example-url>../screenshots/components/v1/password.png</example-url>
*/
@Component({
  selector: 'moh-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => PasswordComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => PasswordComponent) }]
})
export class PasswordComponent  extends PasswordBase {
  constructor(injector: Injector) {
    super(injector);
  }
}

