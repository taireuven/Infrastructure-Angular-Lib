import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { PasswordV2Component } from './password.v2.component';
import { TextboxV2Module } from '../../textbox/v2/textbox.v2.module';


@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    TextboxV2Module
  ],
  declarations: [
    PasswordV2Component
  ],
  exports: [
    PasswordV2Component
  ]
})
export class PasswordV2Module { }
