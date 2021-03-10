import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';;
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { MenuItemChangeLanguageComponent } from './menu-item-change-language/menu-item-change-language.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    MenuListItemComponent,
    MenuItemComponent,
    MenuItemChangeLanguageComponent
  ],
  exports: [
    MenuListItemComponent,
    MenuItemComponent,
    MenuItemChangeLanguageComponent
  ]
})
export class NavbarBaseModule { }
