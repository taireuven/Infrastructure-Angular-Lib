import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormSubmitService } from '../../../services/form-submit/form-submit.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ButtonComponent
  ],
  providers: [FormSubmitService],
  exports: [
    ButtonComponent
  ]
})
export class ButtonModule { }
