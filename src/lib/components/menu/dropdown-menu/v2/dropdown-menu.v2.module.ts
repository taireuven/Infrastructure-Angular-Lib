import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ButtonV2Module } from '../../../button/v2/button.v2.module';
import { DropdownMenuV2Component } from './dropdown-menu.v2.component';
import { MenuService } from '../../../../services/menu/menu.service';

@NgModule({
  imports: [
    SharedModule,
    ButtonV2Module,
  ],
  declarations: [
    DropdownMenuV2Component
  ],
  exports: [
    DropdownMenuV2Component
  ],
  providers: [MenuService]
})
export class DropdownMenuV2Module { }
