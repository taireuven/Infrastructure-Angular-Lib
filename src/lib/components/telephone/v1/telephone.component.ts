import { Component, ViewEncapsulation, forwardRef, Injector } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import { TelephoneBase } from "../base/telephone.base";
import { TelephoneService } from "../base/telephone.service";

/**
 * The telephone component displays a select with phone prefixes and a textbox for the number
 *
 * ### Usage
 * ```html

   <!-- basic telephone -->
   <moh-telephone formControlName="telephone"></moh-telephone>

   <!-- required telephone -->
   <moh-telephone formControlName="telephone" [MarkAsRequired]="true" [isRequired]="true"></moh-telephone>

  ```
 * <example-url>../screenshots/components/v1/telephone.png</example-url>
*/
@Component({
  selector: 'moh-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TelephoneComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TelephoneComponent) },
  ]
})

export class TelephoneComponent extends TelephoneBase {
  
  constructor(telephoneService: TelephoneService, injector: Injector) {
    super(telephoneService, injector);
  }
}
