import { Component, ViewEncapsulation, forwardRef, Injector, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from "@angular/forms";
import { TelephoneBase } from "../base/telephone.base";
import { TelephoneService } from "../base/telephone.service";

/**
 * The telephone component displays a select with phone prefixes and a textbox for the number
 *
 * ### Usage
  ```html

   <!-- basic telephone -->
   <moh-telephone formControlName="telephone"></moh-telephone>

   <!-- required telephone -->
   <moh-telephone formControlName="telephone" [MarkAsRequired]="true" [isRequired]="true"></moh-telephone>

   <!-- telephone without invalid style -->
   <moh-telephone formControlName="telephone" [ignoreInvalidStyle]="true"></moh-telephone>

   <!-- telephone with custom prefix options -->
   <moh-telephone formControlName="telephone" [MarkAsRequired]=true [isRequired]="true" [prefixOptions]="prefixOptions" [prefixDisplayField]="null"></moh-telephone>

  ``` 
 * <example-url>../screenshots/components/v2/telephone.png</example-url>
*/
@Component({
  selector: 'moh-telephone',
  templateUrl: './telephone.v2.component.html',
  styleUrls: ['./telephone.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => TelephoneV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => TelephoneV2Component) },
  ]
})
export class TelephoneV2Component extends TelephoneBase {

  /**
  * Whether to ignore the invalid style when the control is invalid.
  */
  @Input() ignoreInvalidStyle: boolean = false;
  /**
  * Whether to show the error message even though the control was not touched.
  */
  @Input() showErrorMessage: boolean = false;
  
  constructor(telephoneService: TelephoneService, injector: Injector) {
    super(telephoneService, injector);
  }

  markAsTouched(){
    this.onTouched();
  }

  reset(){
    this.baseAbstractControl.reset();
  }
}
