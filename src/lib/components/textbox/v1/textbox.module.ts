import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';

import { TextboxComponent } from './textbox.component';


@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
      TextboxComponent
  ],
  exports: [
    TextboxComponent
  ]
})
export class TextboxModule { }
