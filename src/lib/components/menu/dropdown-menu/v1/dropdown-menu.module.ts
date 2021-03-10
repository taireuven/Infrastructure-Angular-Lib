import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ButtonModule } from '../../../button/v1/button.module';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { MenuService } from '../../../../services/menu/menu.service';

@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
  ],
  declarations: [
    DropdownMenuComponent
  ],
  exports: [
    DropdownMenuComponent
  ],
  providers: [MenuService]
})
export class DropdownMenuModule { }
