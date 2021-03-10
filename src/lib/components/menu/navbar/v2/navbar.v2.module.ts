import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../../shared/shared.module';
import { ButtonV2Module } from '../../../button/v2/button.v2.module';
import { NavbarV2Component } from './navbar.v2.component';
import { MenuService } from '../../../../services/menu/menu.service';
import { NavService } from '../base/nav.service';
import { NavbarBaseModule } from '../base/navbar.base.module';
import { SelectLanguageV2Module } from '../../../select-language/v2/select-language.v2.module';


@NgModule({
  imports: [
    SharedModule,
    ButtonV2Module,
    NavbarBaseModule,
    SelectLanguageV2Module,
  ],
  declarations: [
    NavbarV2Component
  ],
  exports: [
    NavbarV2Component
  ],
  providers: [MenuService, NavService]
})
export class NavbarV2Module { }
