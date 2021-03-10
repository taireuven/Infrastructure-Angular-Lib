import { Component, ElementRef, Injector } from '@angular/core';
import { NavbarBase } from '../base/navbar.base';

/**
 * moh-navbar is a responsive main menu
 *
 * ### Usage
 * ```html
   <!-- navbar with menu items array Input -->
   <moh-navbar [menuItems]="menuItems">

   <!-- navbar with menu Id Input, when the menu exist on DB -->
   <moh-navbar [menuId]="1">

 * ```
 * <example-url>../screenshots/components/navbar_desktop.png</example-url>
 * <example-url>../screenshots/components/navbar_mobile.png</example-url>
*/
@Component({
  selector: 'moh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends NavbarBase  {
 
  constructor(injector: Injector) {
    super(injector);
  }
}
