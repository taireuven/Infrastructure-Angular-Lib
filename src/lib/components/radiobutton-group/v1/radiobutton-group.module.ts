import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { RadiobuttonGroupComponent } from './radiobutton-group.component';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
    RadiobuttonGroupComponent
  ],
  exports: [
    RadiobuttonGroupComponent
  ]
})
export class RadiobuttonGroupModule { }
