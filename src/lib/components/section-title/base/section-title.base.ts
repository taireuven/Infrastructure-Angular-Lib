import { OnInit, Input, Injector } from '@angular/core';

import { LabelBase } from '../../base/label-base';

export class SectionTitleBase extends LabelBase implements OnInit {
  /**
  * The image src to be display.
  */
  @Input() imgSrc?: string;
  /**
  * The matirial icon name to be display.
  */
  @Input() icnName?: string;
  /**
  * The number to be display before the title.
  */
  @Input() number?: string;
  /**
  * The title.
  */
  @Input() title: string;
  @Input() extention?: string;

  constructor(injector: Injector) { super(injector); }

  ngOnInit() {
  }

}
