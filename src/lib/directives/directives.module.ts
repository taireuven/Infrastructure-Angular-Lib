import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbersOnlyDirective } from './numbers-only.directive';
import { FocusFirstInvalidControlDirective } from './focus-first-invalid-control.directive';
import { DirDirective } from './dir.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NumbersOnlyDirective,
    FocusFirstInvalidControlDirective,
    DirDirective
  ],
  exports: [
    NumbersOnlyDirective,
    FocusFirstInvalidControlDirective,
    DirDirective
  ]
})
export class DirectivesModule { }
