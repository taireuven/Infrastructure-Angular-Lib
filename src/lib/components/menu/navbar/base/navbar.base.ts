import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Injector, OnDestroy } from '@angular/core';
import { Observable , Subscription } from 'rxjs';
import { LabelBase } from '../../../base/label-base';
import { IMenuItem } from '../../../../models/IMenuItem';
import { NavService } from './nav.service';
import { MenuService } from '../../../../services/menu/menu.service';
import { MatDrawer } from '@angular/material';

export class NavbarBase extends LabelBase implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('appDrawer', { static: true }) appDrawer: MatDrawer;

  /**
  * The menu Id from db.
  */
  @Input() menuId?: number;
  /**
  * The menu items array to display as navbar menu.
  * For custom menu, if the menu declared with menu id in db, this parameter is unnecessary.
  */
  @Input() menuItems: IMenuItem[] = [];
  /**
  * Whether to Show Icons declared for the menu Items, beside the menu title.
  */
  @Input() showIcons: boolean = false;

  private navService: NavService;
  private menuService: MenuService;

  constructor(injector: Injector) {
    super(injector);
    this.navService = injector.get(NavService);
    this.menuService = injector.get(MenuService);
  }

  ngAfterViewInit() {
    if (this.navService.appDrawer){
      console.warn(`Warning! Because there are two <moh-navbar>s on the page, all triggers will
      activate this second navbar! This is the new navbar: `, this.appDrawer);
    }
    this.navService.appDrawer = this.appDrawer || this.navService.appDrawer;
    this.navService.isOpen$ = this.navService.appDrawer.openedChange;

  }

  ngOnInit() {
    if (this.menuId) {
      this.menuService.getMenu(this.menuId).subscribe((menuItems) => {
        this.menuItems = menuItems;

        this.menuItems.forEach(item => {
          item['titleValue'] = this.getLabelText(item.titleKey);
        });
      });
    }
    this.menuItems.forEach(item => {
      item['titleValue'] = this.getLabelText(item.titleKey);
    });
  }

  toggleNav() {
    this.navService.toggleNav();
  }
  ngOnDestroy(){
    if (this.navService.appDrawer === this.appDrawer){
      this.navService.appDrawer = null;
      this.navService.isOpen$ = null;
    }
  }

}
