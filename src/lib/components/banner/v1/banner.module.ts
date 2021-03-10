import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BannerComponent } from './banner.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }
