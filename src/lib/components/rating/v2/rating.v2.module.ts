import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { RatingV2Component } from './rating.v2.component';
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
// import { CheckboxV2Module } from '../../checkbox/v2/checkbox.v2.module';
import { CheckboxGroupV2Module } from '../../checkbox-group/v2/checkbox-group.v2.module';


@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    ErrorMessageV2Module,
    ButtonV2Module,
    CheckboxGroupV2Module
  ],
  declarations: [
    RatingV2Component
  ],
  exports: [
    RatingV2Component
  ]
})
export class RatingV2Module { }
