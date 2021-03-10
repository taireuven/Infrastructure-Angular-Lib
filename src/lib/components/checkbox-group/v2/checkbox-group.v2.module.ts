import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { CheckboxGroupV2Component } from './checkbox-group.v2.component';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
    CheckboxGroupV2Component
  ],
  exports: [
    CheckboxGroupV2Component
  ]
})
export class CheckboxGroupV2Module { }
