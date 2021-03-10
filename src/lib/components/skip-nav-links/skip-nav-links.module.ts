import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkipNavLinksComponent } from './skip-nav-links.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    SkipNavLinksComponent
  ],
  exports: [
    SkipNavLinksComponent
  ]
})
export class SkipNavLinksModule { }
