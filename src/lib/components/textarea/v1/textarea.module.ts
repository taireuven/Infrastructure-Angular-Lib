import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TextareaComponent } from './textarea.component';
import { LabelFieldModule } from '../../label-field/label-field.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
    TextareaComponent
  ],
  exports: [
    TextareaComponent
  ]
})
export class TextareaModule { }
