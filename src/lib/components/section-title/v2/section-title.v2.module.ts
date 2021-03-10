import { NgModule } from '@angular/core';
import { SectionTitleV2Component } from './section-title.v2.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SectionTitleV2Component
  ],
  exports: [
    SectionTitleV2Component
  ]
})
export class SectionTitleV2Module { }
