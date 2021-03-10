import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { InfoV2Component } from './info.v2.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InfoV2Component
  ],
  exports: [
    InfoV2Component
  ]
})
export class InfoV2Module { }

