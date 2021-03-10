import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { ButtonModule } from '../../button/v1/button.module';

import { SlideToggleComponent } from './slide-toggle.component';
export { ToggleOption } from '../base/ToggleOption';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    ButtonModule
  ],
  declarations: [
    SlideToggleComponent
  ],
  exports: [
    SlideToggleComponent
  ]
})
export class SlideToggleModule { }
