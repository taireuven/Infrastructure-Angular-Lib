import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BannerModule } from '../../banner/v1/banner.module';
import { BreadcrumbsModule } from '../../breadcrumbs/breadcrumbs.module';

import { FormTitleComponent } from './form-title.component';

@NgModule({
  imports: [
    SharedModule,
    BannerModule,
    BreadcrumbsModule
  ],
  declarations: [
    FormTitleComponent
  ],
  exports: [
    FormTitleComponent
  ]
})
export class FormTitleModule { }
