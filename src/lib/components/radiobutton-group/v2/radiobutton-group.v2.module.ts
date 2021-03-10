import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { TextboxV2Module } from '../../textbox/v2/textbox.v2.module';
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';

import { RadiobuttonGroupV2Component } from './radiobutton-group.v2.component';

export { FreeTextOption } from '../base/freeTextOption';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    TextboxV2Module,
    ErrorMessageV2Module
  ],
  declarations: [
    RadiobuttonGroupV2Component
  ],
  exports: [
    RadiobuttonGroupV2Component
  ]
})
export class RadiobuttonGroupV2Module { }
