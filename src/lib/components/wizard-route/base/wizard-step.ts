import { FormGroup } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { LabelBase } from '../../base/label-base';
import { Injector } from '@angular/core';

/**
* Base class for content step component.
*/
export class WizardStep extends LabelBase {

  constructor(injector: Injector) { super(injector); }

  /**
  * The FormGroup object of step.
  * Should to placed the initializing of this object with its controls in the constructor of the derived class.
  */
  stepFormGroup: FormGroup = new FormGroup({});
  /**
  * Whether to show previous step button for this step.
  */
  allowPrev: boolean = true;
  /**
  * A function that returns a value indicating whether it is possible to proceed to the next step.
  */
  canNext?(): Observable<boolean> {
    return observableOf(true);
  }
  /**
  * A function that returns a value indicating whether it is possible to proceed to the prev step.
  */
  canPrev?(): Observable<boolean> {
    return observableOf(true);
  }

  /**
  * @ignore
  */
  formSaved: boolean = false;
}
