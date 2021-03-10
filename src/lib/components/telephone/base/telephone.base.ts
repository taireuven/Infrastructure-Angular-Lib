import { OnInit, Input, Injector, OnDestroy } from '@angular/core';
import { Observable , of } from 'rxjs';
import { TelephoneService } from './telephone.service';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { Prefix } from './Telephone';
import { FormGroup, FormControl } from '@angular/forms';
import { mohValidators } from '../../error-message/base/mohValidators';

export class TelephoneBase extends BaseAbstractControl implements OnInit, OnDestroy {

  errorflag: boolean = false;
  /**
  * Defines whether the telephone is required or not.
  */
  @Input() isRequired: boolean;
  /**
  * An array of prefix options.
  */
  @Input() prefixOptions?: any[];
  /**
  * The display field name of the prefix option object.
  */
  @Input() prefixDisplayField?: string = 'text';
  /**
  * The value field name of the prefix option object.
  */
  @Input() prefixValueField?: string;

  codes: Observable<Prefix[]>;
  errorGetListTextValue: Observable<string>;
  constructor(private telephoneService: TelephoneService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {

    this.codes = this.prefixOptions ? of(this.prefixOptions) : this.telephoneService.getPhonePrefix();

    this.errorGetListTextValue = this.getLabelText('errorGetList');

    this.baseAbstractControl = new FormGroup({
      prefix: new FormControl('', []),
      phoneNumber: new FormControl('', [mohValidators.pattern("^[0-9\"']*$"), mohValidators.minLength(7, null, 'phoneLength'), mohValidators.maxLength(7, null, 'phoneLength')]),
    }, (this.isRequired ? [mohValidators.phoneRequired()] : []));

    this.subscriptions.push(this.baseAbstractControl.valueChanges.subscribe(val => {
      this.updateValidators();
    }));

    this.subscriptions.push(this.codes.subscribe(data => {
      if (!data) {
        //error
        console.log("error from get phone prefix action method");
        this.errorflag = true;
      }
    }));
    //accessibility
    /*var prefix = document.getElementById("telPrefix");
    prefix.getElementsByTagName("input")[0].tabIndex = 1;

    var telephone = document.getElementById("tel");
    telephone.getElementsByTagName("input")[0].tabIndex = 2;*/
    super.ngOnInit();
  }

  updateValidators() {

    if (!this.isRequired) {
      let prefix = this.baseAbstractControl.get('prefix').value;
      let number = this.baseAbstractControl.get('phoneNumber').value;

      if ((number && !prefix) || (!number && prefix)) {
        this.baseAbstractControl.setValidators(mohValidators.phoneRequired());
      }
      else {
        this.baseAbstractControl.clearValidators();
      }
    }
  }

  writeValue(value: any): void {
    if (value === null) {
      this.baseAbstractControl.get('prefix').setValue(null);
      this.baseAbstractControl.get('phoneNumber').setValue(null);
    }
    else {
      super.writeValue(value);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
