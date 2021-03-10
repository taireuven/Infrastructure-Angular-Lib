import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
import { SlideToggleV2Component } from './slide-toggle.v2.component';
export { ToggleOption } from '../base/ToggleOption';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    ButtonV2Module
  ],
  declarations: [
    SlideToggleV2Component
  ],
  exports: [
    SlideToggleV2Component
  ]
})
export class SlideToggleV2Module { }
