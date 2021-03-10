import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { CheckboxGroupComponent } from './checkbox-group.component';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
    CheckboxGroupComponent
  ],
  exports: [
    CheckboxGroupComponent
  ]
})
export class CheckboxGroupModule { }
