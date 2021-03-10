import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RichTextTooltipComponent } from './rich-text-tooltip.component';

@NgModule({
  declarations: [RichTextTooltipComponent],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [RichTextTooltipComponent]
})
export class RichTextTooltipModule { }
