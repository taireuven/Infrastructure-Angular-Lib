import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { FooterV2Component } from './footer.v2.component';
import { FooterService } from '../base/footer.service'



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [FooterV2Component],
  providers: [FooterService],
  exports: [
    FooterV2Component
  ]
})
export class FooterV2Module { }
