import { FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { AbstractControlOptions } from "@angular/forms/src/model";
export class ExtendFormControl extends FormControl{
  set: any;
  constructor(obj:any, formState?: any, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[])
  {
    super();
    this.set = obj;
  }
  
}
