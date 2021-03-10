import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormCardComponent } from './form-card.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FormCardComponent
  ],
  exports: [
    FormCardComponent
  ]
})
export class FormCardModule { }
