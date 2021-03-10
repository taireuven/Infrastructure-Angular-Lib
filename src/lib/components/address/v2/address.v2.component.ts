import { Component, ViewEncapsulation, forwardRef, Injector, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AddressBase } from '../base/address.base';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { AddressService } from '../base/address.service';

/**
* moh-address contains form with fields for all address details.
*
* ### Usage
* #### HTML
 ```html

  <!-- basic address -->
  <moh-address formControlName="Address"></moh-address>

  <!-- address with some input -->
  <moh-address formControlName="Address" [MarkAsRequired]=true ></moh-address>

  <!-- address with validations -->
  <moh-address formControlName="Address" [houseNumberValidators]="houseNumberValidators"> </moh-address>

 ```
*
* #### TS
 ```typescript

  houseNumberValidators: ValidatorFn[] = [mohValidators.required(), mohValidators.pattern(new RegExp("^[{א-ת} 0-9\"']*$"))];

 ```
*
* <example-url>../screenshots/components/v2/address.png</example-url>
*/
@Component({
  selector: 'moh-address',
  templateUrl: './address.v2.component.html',
  styleUrls: ['./address.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: forwardRef(() => AddressV2Component) },
    { provide: NG_VALIDATORS, multi: true, useExisting: forwardRef(() => AddressV2Component) }]

})
export class AddressV2Component extends AddressBase implements OnChanges {
  /**
  * Whether to display the city field.
  */
  @Input() displayCity: boolean = true;
  /**
  * Whether to display the street field.
  */
  @Input() displayStreet: boolean = true;
  /**
  * Whether to display the house number field.
  */
  @Input() displayHouseNumber: boolean = true;
  /**
  * Whether to display the entrace field.
  */
  @Input() displayEntrance: boolean = true;
  /**
  * Whether to display the appartment field.
  */
  @Input() displayAppartment: boolean = true
  /**
  * Whether to display the zipcode field.
  */
  @Input() displayZipCode: boolean = true;
  /**
  * Whether to display the postbox field.
  */
  @Input() displayPostbox: boolean = true;

  constructor(injector: Injector, addressService: AddressService) {
    super(injector, addressService);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateValidators(changes, 'displayCity', 'cityId', this.cityValidators);
    this.updateValidators(changes, 'displayStreet','streetId', this.streetValidators);
    this.updateValidators(changes, 'displayHouseNumber', 'houseNumber', this.houseNumberValidators);
    this.updateValidators(changes, 'displayEntrance', 'entrance', this.entranceValidators);
    this.updateValidators(changes, 'displayAppartment', 'appartmentNumber', this.appartmentValidators);
    this.updateValidators(changes, 'displayZipCode', 'zipCode', this.zipCodeValidators);
    this.updateValidators(changes, 'displayPostbox', 'postbox', this.postboxValidators);
  }

  updateValidators(changes: SimpleChanges, inputName: string,controlName:string, validators: ValidatorFn[]) {
    if (changes[inputName]) {
      if (changes[inputName].currentValue == false && changes[inputName].previousValue == true) {
        this.baseAbstractControl.get(controlName).clearValidators();
        this.baseAbstractControl.get(controlName).updateValueAndValidity();
      }
      else if (changes[inputName].currentValue == true && changes[inputName].previousValue == false) {
        this.baseAbstractControl.get(controlName).setValidators(validators);
        this.baseAbstractControl.get(controlName).updateValueAndValidity();
      }
    }
  }
}

