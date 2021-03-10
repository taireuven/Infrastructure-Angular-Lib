import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DatepickerV2Component } from './datepicker.v2.component';
import { LabelFieldModule } from '../../label-field/label-field.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [DatepickerV2Component],
  exports: [DatepickerV2Component]
})
export class DatepickerV2Module { }
