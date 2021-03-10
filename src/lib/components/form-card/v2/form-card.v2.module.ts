import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormCardV2Component } from './form-card.v2.component';
import { SectionTitleV2Module } from '../../section-title/v2/section-title.v2.module';

@NgModule({
  imports: [
    SharedModule,
    SectionTitleV2Module
  ],
  declarations: [
    FormCardV2Component
  ],
  exports: [
    FormCardV2Component
  ]
})
export class FormCardV2Module { }
