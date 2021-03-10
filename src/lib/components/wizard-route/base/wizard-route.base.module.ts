import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusWizardFormDirective } from './focus-wizard-form.directive';

export * from './step-entity';
export * from './wizard-step';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FocusWizardFormDirective
  ],
  exports: [
    FocusWizardFormDirective
  ]
})
export class WizardRouteBaseModule { }
