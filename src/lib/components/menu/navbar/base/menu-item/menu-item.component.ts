import { Component, Input, ViewChild, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LabelBase } from '../../../../base/label-base';
import { Observable , Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IMenuItem } from '../../../../../models/IMenuItem';

/**
 * @ignore
 */
@Component({
  selector: 'moh-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent extends LabelBase implements OnInit, OnDestroy {

  @Input() items: IMenuItem[];
  @Input() showIcons: boolean = false;
  @Input() matMenuClass?: string;
  @Input() firstMatMenuClass?: string;

  @ViewChild('childMenu', { static: true }) public childMenu;

  private subscription: Subscription;

  constructor(public router: Router, injector: Injector ) {
    super(injector);
  }

  ngOnInit(): void {

    this.subscription = this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.items.forEach(item => {
          if (item.children) {
            item['hasActiveChild'] = this.checkIfHasActiveChild(item.children);
          }
        });
      });
    
    this.items.forEach(item => {
      item['titleValue'] = this.getLabelText(item.titleKey);
    });
  }

  onItemSelected(item: IMenuItem) {
    if (!item.children || !item.children.length) {
      if (item.triggerFunction) {
        item.triggerFunction();
        if (item.url.length < 1){
          return;
        }
      }
      if (item.isExternal) {
        window.open(item.url, item.isStatic ? '_blank' : '_self');
      }
    }
  }

  private checkIfHasActiveChild(items: IMenuItem[]) {

    var url = this.router.url;

    for (var i = 0; i < items.length; i++) {
      if (items[i].url == url) {
        return true;
      }
      if (items[i].children) {
        return this.checkIfHasActiveChild(items[i].children);
      }
    }
    return false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }
}
