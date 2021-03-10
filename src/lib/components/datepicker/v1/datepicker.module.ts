import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DatepickerComponent } from './datepicker.component';
import { LabelFieldModule } from '../../label-field/label-field.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [DatepickerComponent],
  exports:[DatepickerComponent]
})
export class DatepickerModule { }
