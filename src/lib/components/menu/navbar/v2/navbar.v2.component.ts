import { Component, ElementRef, Injector, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { NavbarBase } from '../base/navbar.base';
import { Router, NavigationEnd } from '@angular/router';
import { IMenuItem } from '../../../../models/IMenuItem';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Language } from '../../../../models/language';
/**
 * moh-navbar is a responsive main menu
 *
 * ### Usage
  ```html
   <!-- navbar with menu items array Input -->
   <moh-navbar [menuItems]="menuItems">

   <!-- navbar with menu Id Input, when the menu exist on DB -->
   <moh-navbar [menuId]="1">

  ```
 * <example-url>../screenshots/components/navbar_desktop.png</example-url>
 * <example-url>../screenshots/components/navbar_mobile.png</example-url>
*/

@Component({
  selector: 'moh-navbar',
  templateUrl: './navbar.v2.component.html',
  styleUrls: ['./navbar.v2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarV2Component extends NavbarBase implements OnDestroy {
  /**
   * Display language selector inside navbar.
   */
  @Input() showSelectLanguage: boolean = false;
  /**
  * Whether to hide the toggle menu button in mobile.
  */
  @Input() hideMobileToggleButton: boolean = false;
  /**
   * @ignore
   */
  @Input() languagesListApps?: string;
  /**
   * @ignore
   */
  @Input() languagesList?: Language[];

  constructor(injector: Injector, private router: Router) {
    super(injector);


    this.subscriptions.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.menuItems.forEach(item => {
          if (item.children) {
            item['hasActiveChild'] = this.checkIfHasActiveChild(item.children);
          }
        });
      }));
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
    super.ngOnDestroy();
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
