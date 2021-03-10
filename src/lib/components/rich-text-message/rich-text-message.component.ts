import { Component, OnInit, Input, Injector, ChangeDetectionStrategy } from '@angular/core';
import { LabelBase } from '../base/label-base';
import { Observable } from 'rxjs';

const DOC_TYPE: string = 'richTextMessages.';

@Component({
  selector: 'moh-rich-text-message',
  templateUrl: './rich-text-message.component.html',
  styleUrls: ['./rich-text-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class RichTextMessageComponent extends LabelBase implements OnInit {

  @Input() messageKey: string;
  messageValue: Observable<string>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.messageKey = this.messageKey.split('.').length == 1 ? DOC_TYPE + this.messageKey : this.messageKey;
    this.messageValue = this.getLabelText(this.messageKey);
  }
}
