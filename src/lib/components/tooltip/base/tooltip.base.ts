import { Input, Injector, Injectable } from '@angular/core';

import { TooltipPosition } from '@angular/material';

import { LabelBase } from '../../base/label-base';
import { Direction } from '../../../models/direction';
import { MohTranslateService } from '../../../moh-angular-lib.module';


export class TooltipBase extends LabelBase {
  private translate: MohTranslateService;
  private _location?: TooltipPosition;

  /**
  * Text to display in tooltip.
  */
  @Input() text: string;
  /**
  * The location of tooltip,
  *
  * default: returns 'right' for ltr layout, and left for rtl layout
  *
  * type TooltipPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';
  */
  @Input()
  set location(value: TooltipPosition) { this._location = value; }
  get location(): TooltipPosition {
    if (this._location) {
      switch (this._location) {
        case 'before':
          return this.translate.direction == Direction.LTR ? 'left' : 'right'; break;
        case 'after':
          return this.translate.direction == Direction.LTR ? 'right' : 'left'; break;
        // case 'right':
        //   return this.translate.direction == Direction.LTR ? 'after' : 'before'; break;
        // case 'left':
        //   return this.translate.direction == Direction.LTR ? 'before' : 'after'; break;
      }
    }
    return this._location || (this.translate.direction == Direction.LTR ? 'right' : 'left');
  }

  constructor(protected injector: Injector) {
    super(injector);
    this.translate = injector.get(MohTranslateService);
  }
}
