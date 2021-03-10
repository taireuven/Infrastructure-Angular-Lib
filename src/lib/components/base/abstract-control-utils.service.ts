import { Injectable, ChangeDetectorRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class AbstractControlUtilsService {

  constructor() { };

  setNullValue = (abstractControl: AbstractControl): any => {

    var val = this.resetAbstractControl(abstractControl);
    abstractControl.setValue(val, { emitEvent: false });
  }

  private resetAbstractControl = (abstractControl: AbstractControl): any => {

    var abstractModel = null;

    if (abstractControl['controls']) {

      if (abstractControl['controls'].length != undefined) { //formArray

        abstractModel = [];
        for (var i = 0; i < abstractControl['controls'].length; i++) {
          abstractModel[i] = this.resetAbstractControl(abstractControl['controls'][i]);
        }
      }
      else {
        abstractModel = {}; //formGroup
        Object.keys(abstractControl['controls']).forEach((controlName) => {
          abstractModel[controlName] = this.resetAbstractControl(abstractControl['controls'][controlName]);
        });
      }
      return abstractModel;
    }
    else {
      return null;
    }
  }
}
