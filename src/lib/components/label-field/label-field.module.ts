import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LabelFieldComponent } from './label-field.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LabelFieldComponent
  ],
  exports: [
    LabelFieldComponent
  ]
})
export class LabelFieldModule { }
