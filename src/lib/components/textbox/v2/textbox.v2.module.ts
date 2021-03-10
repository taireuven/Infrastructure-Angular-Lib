import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { TextboxV2Component } from './textbox.v2.component';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
    TextboxV2Component
  ],
  exports: [
    TextboxV2Component
  ]
})
export class TextboxV2Module { }
