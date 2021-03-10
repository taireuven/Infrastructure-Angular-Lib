import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { ButtonModule } from '../../../button/v1/button.module';
import { NavbarComponent } from './navbar.component';
import { MenuService } from '../../../../services/menu/menu.service';
import { NavService } from '../base/nav.service';
import { NavbarBaseModule } from '../base/navbar.base.module';

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    NavbarBaseModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  providers: [MenuService, NavService]
})
export class NavbarModule { }
