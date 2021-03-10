import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { TextareaV2Component } from './textarea.v2.component';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule
  ],
  declarations: [
    TextareaV2Component
  ],
  exports: [
    TextareaV2Component
  ]
})
export class TextareaV2Module { }
