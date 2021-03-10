import { Component, ViewEncapsulation, Injector, ChangeDetectionStrategy } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';

import { MatMenuTrigger } from '@angular/material';

import { DropdownMenuBase } from '../base/dropdown-menu.base';

@Component({
  selector: 'moh-dropdown-menu',
  templateUrl: './dropdown-menu.v2.component.html',
  styleUrls: ['./dropdown-menu.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownMenuV2Component extends DropdownMenuBase {

  constructor(injector: Injector, dir: Directionality) {
    super(injector, dir);
  }
}
