import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { FormSubmitService } from '../../../moh-angular-lib.module';
import { ButtonV2Component } from './button.v2.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ButtonV2Component
  ],
  providers: [FormSubmitService],
  exports: [
    ButtonV2Component
  ]
})
export class ButtonV2Module { }
