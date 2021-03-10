import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
import { FilterSlideToggleComponent } from './filter-slide-toggle.component';
export { ToggleOption } from '../base/ToggleOption';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    ButtonV2Module
  ],
  declarations: [
    FilterSlideToggleComponent
  ],
  exports: [
    FilterSlideToggleComponent
  ]
})
export class FilterSlideToggleModule { }
