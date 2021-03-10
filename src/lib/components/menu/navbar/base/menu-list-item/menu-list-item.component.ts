import { Component, HostBinding, Input, Injector } from '@angular/core';

import { Router } from '@angular/router';
import { NavService } from '../nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LabelBase } from '../../../../base/label-base';
import { Observable } from 'rxjs';
import { IMenuItem } from '../../../../../models/IMenuItem';

/**
 * @ignore
 */
@Component({
  selector: 'moh-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(90deg)' })),
      state('expanded', style({ transform: 'rotate(0deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent extends LabelBase {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: IMenuItem;
  @Input() depth: number;
  @Input() showIcons: boolean = false;
  @Input() triggerFunction?: Function;

  constructor(public navService: NavService, public router: Router, injector: Injector) {
    super(injector);

    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: IMenuItem) {
    if (!item.children || !item.children.length) {
      if (item.triggerFunction) {
        item.triggerFunction();
        if (item.url.length < 1){
          this.navService.closeNav();
          return;
        }
      }
      if (item.isExternal) {
        window.open(item.url, item.isStatic ? '_blank' : '_self');
      }
      else {
        this.router.navigate([item.url]);
      }
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}

