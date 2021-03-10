import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    TooltipComponent
  ],
  exports: [
    TooltipComponent
  ]
})
export class TooltipModule { }
