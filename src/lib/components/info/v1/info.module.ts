import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { InfoComponent } from './info.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    InfoComponent
  ],
  exports: [
    InfoComponent
  ]
})
export class InfoModule { }
