import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BannerV2Module } from '../../banner/v2/banner.v2.module';

import { FormTitleV2Component } from './form-title.v2.component';

@NgModule({
  imports: [
    SharedModule,
    BannerV2Module
  ],
  declarations: [
    FormTitleV2Component
  ],
  exports: [
    FormTitleV2Component
  ]
})
export class FormTitleV2Module { }
