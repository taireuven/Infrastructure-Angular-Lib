import { NgModule } from '@angular/core';
import { TooltipV2Component } from './tooltip.v2.component';
import { SharedModule } from '../../../shared/shared.module';
import { TooltipHtmlComponent } from './tooltip-html/tooltip-html.component';
import { MdePopoverModule } from '@material-extended/mde';

@NgModule({
  imports: [
    SharedModule,
     MdePopoverModule 
  ],
  declarations: [
    TooltipV2Component,
    TooltipHtmlComponent
  ],
  exports: [
    TooltipV2Component,
    TooltipHtmlComponent
  ]
})
export class TooltipV2Module { }
