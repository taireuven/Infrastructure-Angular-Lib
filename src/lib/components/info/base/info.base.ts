import { OnInit, Input, Injector } from '@angular/core';
import { LabelBase } from '../../base/label-base';

export class InfoBase extends LabelBase implements OnInit {

  /**
  * The text to show in info-line
  */
  @Input() text: string;

  constructor(injector: Injector) { super(injector) }

  ngOnInit() {
  }

}
