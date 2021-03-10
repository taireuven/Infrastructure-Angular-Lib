import { Component, ViewChild, Input, ViewEncapsulation, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';

import { MatMenuTrigger } from '@angular/material';

import { NavbarBase } from '../../navbar/base/navbar.base';
import { MohTranslateService } from '../../../../moh-angular-lib.module';

export class DropdownMenuBase extends NavbarBase{
  private _xPosition: string;
  private translate: MohTranslateService;

  menuOpen: boolean = false;

  @Input() buttonText: string;
  @Input() set xPosition(value: string) { this._xPosition = value; }
  @Input() isDisabled: boolean = false;

  get xPosition(): string {
    return this._xPosition || (this.translate.direction == this.dir.value ? 'after' : 'before');
  }

  constructor(injector: Injector, private dir: Directionality) {
    super(injector);
    this.translate = injector.get(MohTranslateService);
  }

}
