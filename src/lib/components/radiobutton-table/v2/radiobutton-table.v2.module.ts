import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { RadiobuttonTableV2Component } from './radiobutton-table.v2.component';
import { RadiobuttonGroupV2Module} from './../../radiobutton-group/v2/radiobutton-group.v2.module';
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    RadiobuttonGroupV2Module,
    ErrorMessageV2Module,
  ],
  declarations: [
    RadiobuttonTableV2Component
  ],
  exports: [
    RadiobuttonTableV2Component
  ]
})
export class RadiobuttonTableV2Module { }
