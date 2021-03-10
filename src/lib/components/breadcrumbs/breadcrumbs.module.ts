import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BreadcrumbsComponent } from './breadcrumbs.component';

export { BreadcrumbsService } from './breadcrumbs.service';
export { BreadCrumb } from './breadcrumbs.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    BreadcrumbsComponent
  ],
  exports: [
    BreadcrumbsComponent
  ]
})
export class BreadcrumbsModule { }
