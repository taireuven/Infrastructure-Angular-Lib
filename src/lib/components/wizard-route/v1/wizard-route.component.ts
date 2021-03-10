import { Component, ViewEncapsulation, Injector } from '@angular/core';

import { WizardRouteBase } from '../base/wizard-route.base';

/**
 * The wizard route component 
 * ### Usage
 * ```html

   <!-- basic wizard -->
   <moh-wizard-route [steps]="steps" (onSubmit)="submitWizard($event)"></moh-wizard-route>>

<!-- wizard with some inputs -->
   <moh-wizard-route [steps]="steps" (onSubmit)="submitWizard($event)" (onStepChanged)="stepChanged($event)" [resetOnSubmit]="resetOnSubmit"></moh-wizard-route>>

  ```
*
* #### TS
* ```typescript

  this.steps = [
    { title: 'פרטים אישיים', path: 'personal', icon: 'person' },
    { title: 'כתובת', path: 'address', icon: 'home' },
    { title: 'סיום', path: 'result', icon: 'send' }
  ];

  resetOnSubmit:false;

  submitWizard(formData) {
    console.log('submit wizard', formData);
    //if success submit form to server - 
    this.resetOnSubmit = true;
  }

  stepChanged(stepComponent) {
    console.log('active step component', stepComponent);
  }

 ```
*
 * <example-url>../screenshots/components/v1/wizard-route.png</example-url>
*/
@Component({
  selector: 'moh-wizard-route',
  templateUrl: './wizard-route.component.html',
  styleUrls: ['./wizard-route.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WizardRouteComponent extends WizardRouteBase{
  constructor(injector: Injector) { super(injector); }
}
