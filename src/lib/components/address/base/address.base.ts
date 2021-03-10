import { OnInit, Input, Injector, Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { AddressService } from './address.service';

export class AddressBase extends BaseAbstractControl implements OnInit {

  /**
  * City field validators array.
  */
  @Input() cityValidators?: ValidatorFn[] = [];
  /**
  * Street field validators array.
  */
  @Input() streetValidators?: ValidatorFn[] = [];
  /**
  * HouseNumber field validators array.
  */
  @Input() houseNumberValidators?: ValidatorFn[] = [];
  /**
  * Entrance field validators array.
  */
  @Input() entranceValidators?: ValidatorFn[] = [];
  /**
  * Apartment field validators array.
  */
  @Input() appartmentValidators?: ValidatorFn[] = [];

  @Input() zipCodeValidators?: ValidatorFn[] = [];
  /**
  * Postbox field validators array.
  */
  @Input() postboxValidators?: ValidatorFn[] = [];

  /*
   *
   * ## Example for address validation
   *
   *   for every field: (for example: houseNumber):
   *
   *   in ths .ts file,
   *
   *   houseNumberValidators: ValidatorFn[] = [mohValidators.required(), mohValidators.pattern(new RegExp("^[{א-ת} 0-9\"']*$"))];
   *
   *  in the html:
   *
   *   <moh-address formControlName="Address" [houseNumberValidators]="houseNumberValidators"> </moh-address>
   */

  /**
  * Whether to mark as required the City field with red *.
  */
  @Input() cityMarkAsRequired?: boolean = false;
  /**
  * Whether to mark as required the Street field with red *.
  */
  @Input() streetMarkAsRequired?: boolean = false;
  /**
  * Whether to mark as required the House field with red *.
  */
  @Input() houseMarkAsRequired?: boolean = false;
  /**
  * Whether to mark as required the Entrance field with red *.
  */
  @Input() entranceMarkAsRequired?: boolean = false;
  /**
  * Whether to mark as required the Apartment field with red *.
  */
  @Input() appartmentMarkAsRequired?: boolean = false;
  /**
  * Whether to mark as required the ZipCode field with red *.
  */
  @Input() zipCodeMarkAsRequired?: boolean = false;
  /**
  * Whether to mark as required the PostBox field with red *.
  */
  @Input() postboxMarkAsRequired?: boolean = false;

  /**
  * the display field name for City select options.
  */
  @Input() cityDisplayField?: string = "Description";
   /**
  * the city selected Value field name.
  */
  @Input() cityCodeField?: string = "Code";
  /**
  * the display field name for Street select options.
  */
  @Input() streetDisplayField?: string = "Street_desc";
  /**
  * the street selected Value field name.
  */
  @Input() streetCityCodeField?: string = "City_code";

  /**
  * List of Cities (optional, by default get the organization edm list).
  */
  @Input() citiesList: Observable<any[]> = this.addressService.getCities();//.map(data =>data? data.map(item => ({ Code: item.Code, Description: item.Description })):data);
  /**
  * List of Streets (optional, by default get the organization edm list).
  */
  @Input() streetsList: Observable<any[]> = this.addressService.getStreets();

  /**
  * Flag for force/unforce select listed street or allow typing unlisted street.
  */
  @Input() streetForceSelect?: boolean = false;
  /**
  * Flag for force/unforce select listed city or allow typing unlisted city.
  */
  @Input() cityForceSelect?: boolean = true;

  allStreets: any[] = [];
  streetsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  errorflag: boolean = false;

  entranceList: Observable<any[]> = observableOf([
    { Id: 1, text: 'א' },
    { Id: 2, text: 'ב' },
    { Id: 3, text: 'ג' },
    { Id: 3, text: 'ד' },
    { Id: 3, text: 'ה' },
    { Id: 4, text: 'ו' }
  ]);

  errorListValue: Observable<string>;
  zipCodeValue: Observable<string>;

  constructor(protected injector: Injector, private addressService: AddressService) {
    super(injector);
  }

  ngOnInit() {
    this.errorListValue = this.getLabelText('errorGetList');
    this.zipCodeValue = this.getLabelText('selectZipcode');

    this.baseAbstractControl = new FormGroup({
      cityId: new FormControl('', this.cityValidators),
      streetId: new FormControl('', this.streetValidators),
      houseNumber: new FormControl('', this.houseNumberValidators),
      entrance: new FormControl('', this.entranceValidators),
      appartmentNumber: new FormControl('', this.appartmentValidators),
      zipCode: new FormControl('', this.zipCodeValidators),
      postbox: new FormControl('', this.postboxValidators),
    });

    this.citiesList.subscribe(data => {
      if (!data) {
        //error
        console.log("error from get cities action method");
        this.errorflag = true;
      }
    });

    super.ngOnInit();
  }
}
