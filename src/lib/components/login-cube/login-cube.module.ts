import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BannerV2Module } from '../banner/v2/banner.v2.module';

import { AADLoginCubeComponent } from './login-cube.component';
import { LoginCubeService } from './login-cube.service';

@NgModule({
  imports: [
    SharedModule,
    BannerV2Module
  ],
  declarations: [
    AADLoginCubeComponent
  ],
  exports: [
    AADLoginCubeComponent
  ],
  providers: [
    LoginCubeService
  ]
})
export class AADLoginCubeModule { }
