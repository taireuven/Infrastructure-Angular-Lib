import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RichTextMessageComponent } from './rich-text-message.component';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [RichTextMessageComponent],
  exports: [RichTextMessageComponent, SafeHtmlPipe]
})
export class RichTextMessageModule { }
