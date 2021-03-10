import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CheckboxComponent } from '../v1/checkbox.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    CheckboxComponent
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule { }
