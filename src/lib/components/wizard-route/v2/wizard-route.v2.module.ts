import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
import { SubmitButtonV2Module } from '../../submit-button/v2/submit-button.v2.module';

import { WizardRouteV2Component } from './wizard-route.v2.component';
import { WizardDataService } from '../base/wizardData.service';
import { WorkflowService } from '../base/workflow.service';
import { WorkflowGuard } from '../base/workflow-guard.service';
import { WizardDeactivateGuard } from '../base/wizard-deactivate-guard.service';
import { DirectivesModule } from '../../../directives/directives.module';
import { WizardRouteBaseModule } from '../base/wizard-route.base.module';
import { WizardNavigationComponent } from './wizard-navigation/wizard-navigation.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { WizardHeaderComponent } from './wizard-header/wizard-header.component';
import { StickySectionModule } from '../../sticky-section/sticky-section.module';


@NgModule({
  imports: [
    SharedModule,
    ButtonV2Module,
    SubmitButtonV2Module,
    DirectivesModule,
    WizardRouteBaseModule,
    SwiperModule,
    StickySectionModule
  ],

  declarations: [
    WizardRouteV2Component,
    WizardNavigationComponent,
    WizardHeaderComponent
  ],
  providers: [
    { provide: WizardDataService, useClass: WizardDataService },
    { provide: WorkflowService, useClass: WorkflowService },
    WizardDeactivateGuard,
    WorkflowGuard],
  exports: [
    WizardRouteV2Component
  ]
})
export class WizardRouteV2Module { }
