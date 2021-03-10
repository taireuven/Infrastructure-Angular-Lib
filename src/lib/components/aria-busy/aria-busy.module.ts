import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AriaBusyComponent } from './aria-busy.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [AriaBusyComponent],
  exports: [AriaBusyComponent]
})
export class AriaBusyModule { }
