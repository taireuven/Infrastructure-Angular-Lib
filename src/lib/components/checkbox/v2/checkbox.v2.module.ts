import { NgModule } from '@angular/core';
import { CheckboxV2Component } from './checkbox.v2.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CheckboxV2Component
  ],
  exports: [
    CheckboxV2Component
  ]
})
export class CheckboxV2Module { }
