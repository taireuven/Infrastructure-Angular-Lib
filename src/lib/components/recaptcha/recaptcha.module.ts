import { NgModule } from '@angular/core';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { SharedModule } from '../../shared/shared.module';
import { FormSubmitService } from '../../services/form-submit/form-submit.service';
import { RecaptchaComponent } from './recaptcha.component'
import { RecaptchaService } from './recaptcha.service';

@NgModule({
  imports: [
    SharedModule,
    ReCaptchaModule
  ],
  declarations: [
    RecaptchaComponent
  ],
  providers:[FormSubmitService,RecaptchaService],
  exports: [
    RecaptchaComponent
  ]
})
export class RecaptchaModule { }
