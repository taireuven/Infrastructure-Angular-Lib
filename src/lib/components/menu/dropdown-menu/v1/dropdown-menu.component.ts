import { Component, ViewEncapsulation, Injector } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';

import { MatMenuTrigger } from '@angular/material';

import { DropdownMenuBase } from '../base/dropdown-menu.base';

@Component({
  selector: 'moh-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DropdownMenuComponent extends DropdownMenuBase {
 
  constructor(injector: Injector,  dir: Directionality) {
    super(injector, dir);
  }
}
