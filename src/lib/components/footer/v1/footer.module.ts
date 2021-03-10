import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { FooterComponent } from './footer.component';
import { FooterService } from '../base/footer.service';



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FooterComponent
  ],
  providers: [FooterService],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
