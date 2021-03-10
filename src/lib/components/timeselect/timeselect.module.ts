import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TimeselectComponent } from './timeselect.component';
import { LabelFieldModule } from '../label-field/label-field.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
  ],
  declarations: [TimeselectComponent],
  providers: [],
  exports: [TimeselectComponent],
})
export class TimeselectModule { }
