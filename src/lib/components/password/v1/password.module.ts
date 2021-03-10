import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { PasswordComponent } from './password.component';
import { TextboxModule } from '../../textbox/v1/textbox.module';


@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    TextboxModule
  ],
  declarations: [
    PasswordComponent
  ],
  exports: [
    PasswordComponent
  ]
})
export class PasswordModule { }
