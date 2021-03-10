import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BannerV2Component } from './banner.v2.component';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';

@NgModule({
  imports: [
    SharedModule,
    BreadcrumbsModule
  ],
  declarations: [BannerV2Component],
  exports: [BannerV2Component]
})
export class BannerV2Module { }
