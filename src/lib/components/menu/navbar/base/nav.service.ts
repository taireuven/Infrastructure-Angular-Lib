import {EventEmitter, Injectable} from '@angular/core';
import { MatDrawer } from '@angular/material';

@Injectable()
export class NavService {
  public appDrawer: MatDrawer;
  public isOpen$: EventEmitter<boolean>;

  constructor() {
  }

  public closeNav() {
    this.appDrawer.close();
  }
  public toggleNav() {
    this.appDrawer.toggle();
  }

  public openNav() {
    this.appDrawer.open();
  }
}
