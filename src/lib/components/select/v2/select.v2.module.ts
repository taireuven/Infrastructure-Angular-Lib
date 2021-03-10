import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { SelectV2Component } from './select.v2.component';
import { SelectBaseModule } from '../base/select.base.module';

export { SelectGroup } from '../base/SelectGroup';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    SelectBaseModule
  ],
  declarations: [
    SelectV2Component
  ],
  exports: [
    SelectV2Component
  ]
})
export class SelectV2Module { }
