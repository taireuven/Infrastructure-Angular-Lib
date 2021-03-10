import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from '../../button/v1/button.module';
import { SubmitButtonModule } from '../../submit-button/v1/submit-button.module';

import { WizardRouteComponent } from './wizard-route.component';
import { WizardDataService } from '../base/wizardData.service';
import { WorkflowService } from '../base/workflow.service';
import { WorkflowGuard } from '../base/workflow-guard.service';
import { WizardDeactivateGuard } from '../base/wizard-deactivate-guard.service';
import { DirectivesModule } from '../../../directives/directives.module';
import { WizardRouteBaseModule } from '../base/wizard-route.base.module';

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    SubmitButtonModule,
    DirectivesModule,
    WizardRouteBaseModule
  ],

  declarations: [
    WizardRouteComponent,
  ],
  providers: [
    { provide: WizardDataService, useClass: WizardDataService },
    { provide: WorkflowService, useClass: WorkflowService },
    WizardDeactivateGuard,
    WorkflowGuard],
  exports: [
    WizardRouteComponent
  ]
})
export class WizardRouteModule { }
