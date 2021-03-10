import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { SelectComponent } from './select.component';
import { SelectBaseModule } from '../base/select.base.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    SelectBaseModule
  ],
  declarations: [
    SelectComponent
  ],
  exports: [
    SelectComponent
  ]
})
export class SelectModule { }
