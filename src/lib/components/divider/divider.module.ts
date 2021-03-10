import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DividerComponent } from './divider.component'

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DividerComponent
  ],
  exports: [
    DividerComponent
  ]
})
export class DividerModule { }
