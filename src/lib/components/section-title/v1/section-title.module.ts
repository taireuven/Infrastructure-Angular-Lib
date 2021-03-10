import { NgModule } from '@angular/core';
import { SectionTitleComponent } from './section-title.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SectionTitleComponent
  ],
  exports: [
    SectionTitleComponent
  ]
})
export class SectionTitleModule { }
