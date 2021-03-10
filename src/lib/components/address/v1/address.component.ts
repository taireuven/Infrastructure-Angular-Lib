import { Component, ViewEncapsulation, forwardRef, Injector } from '@angular/core';
import { AddressBase } from '../base/address.base';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { AddressService } from '../base/address.service';

/**
* moh-address contains form with fields for all address details.
*
* ### Usage
* #### HTML
* ```html

  <!-- basic address -->
  <moh-address formControlName="Address"></moh-address>

  <!-- address with some input -->
  <moh-address formControlName="Address" [MarkAsRequired]=true ></moh-address>

  <!-- address with validations -->
  <moh-address formControlName="Address" [houseNumberValidators]="houseNumberValidators"> </moh-address>

* ```
*
* #### TS
* ```typescript

  houseNumberValidators: ValidatorFn[] = [mohValidators.required(), mohValidators.pattern(new RegExp("^[{א-ת} 0-9\"']*$"))];

* ```
*
* <example-url>../screenshots/components/v1/address.png</example-url>
*/
@Component({
  selector: 'moh-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => AddressComponent) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => AddressComponent) }]

})
export class AddressComponent extends AddressBase {
  constructor(injector:Injector,addressService:AddressService) {
    super(injector,addressService);
  }
}
