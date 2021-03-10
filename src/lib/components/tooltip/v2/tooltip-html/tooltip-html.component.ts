import { Component, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { TooltipBase } from '../../base/tooltip.base';

@Component({
  selector: 'moh-tooltip-html',
  templateUrl: './tooltip-html.component.html',
  styleUrls: ['./tooltip-html.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipHtmlComponent extends TooltipBase {
  constructor(injector: Injector) { super(injector); }
  private _placement: string;
  get placement(): string {
    return this.location == 'above' ? 'top' : this.location == 'below' ? 'bottom': this.location;
  }
  get PosX(): string {
    return this.location == 'before' || this.location == 'after' ? this.location: 'before' ;
  }
  get PosY(): string {
    return this.location == 'above' || this.location == 'below' ? this.location: 'above' ;
  }
}
