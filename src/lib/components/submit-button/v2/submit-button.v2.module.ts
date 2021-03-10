import { NgModule } from '@angular/core';
import { SubmitButtonV2Component } from './submit-button.v2.component';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { RecaptchaService } from '../../recaptcha/recaptcha.service';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  imports: [
    SharedModule,
    ButtonV2Module,
    DirectivesModule
  ],
  declarations: [
    SubmitButtonV2Component
  ],
  providers: [FormSubmitService, RecaptchaService],
  exports: [
    SubmitButtonV2Component
  ]
})
export class SubmitButtonV2Module { }
