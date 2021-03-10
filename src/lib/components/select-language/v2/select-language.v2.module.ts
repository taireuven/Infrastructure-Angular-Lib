import { NgModule } from '@angular/core';
import { SelectLanguageV2Component } from './select-language.v2.component';
import { SharedModule } from '../../../shared/shared.module';
import { SelectV2Module } from "../../select/v2/select.v2.module";

@NgModule({
  imports: [
    SharedModule,
    SelectV2Module
  ],
  declarations: [
    SelectLanguageV2Component
  ],
  exports: [
    SelectLanguageV2Component
  ]
})
export class SelectLanguageV2Module { }
