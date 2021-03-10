import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe, FilterGroupPipe } from './FilterPipe';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FilterPipe,
    FilterGroupPipe
  ],
  exports: [
    FilterPipe,
    FilterGroupPipe
  ]
})
export class SelectBaseModule { }
