import { NgModule } from '@angular/core';
import { SubmitButtonComponent } from './submit-button.component';
import { ButtonModule } from '../../button/v1/button.module';
import { SharedModule } from '../../../shared/shared.module';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';
import { RecaptchaService } from '../../recaptcha/recaptcha.service';
import { DirectivesModule } from '../../../directives/directives.module';

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    DirectivesModule
  ],
  declarations: [
    SubmitButtonComponent
  ],
  providers: [FormSubmitService, RecaptchaService],
  exports: [
    SubmitButtonComponent
  ]
})
export class SubmitButtonModule { }
