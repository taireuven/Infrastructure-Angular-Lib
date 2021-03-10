import { Component, Injector, forwardRef, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

import { PasswordBase } from '../base/password.base';

/**
 * The password component provide textbox type password with more password functionality.
 *
 * ### Usage
  ```html

   <!-- basic password -->
   <moh-password formControlName="password"></moh-password>

   <!-- password with some inputs -->
   <moh-password formControlName="password" [MarkAsRequired]="true" [maxlength]="10"
                 [markAsInvalid]="!demoForm.controls.password.valid"></moh-password>

  ```
 *
 * <example-url>../screenshots/components/v2/password.png</example-url>
*/
@Component({
  selector: 'moh-password',
  templateUrl: './password.v2.component.html',
  styleUrls: ['./password.v2.component.scss', '../../../../styles/inputs.v2.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => PasswordV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => PasswordV2Component) }]
})
export class PasswordV2Component extends PasswordBase {
  constructor(injector: Injector) {
    super(injector);
  }
}

