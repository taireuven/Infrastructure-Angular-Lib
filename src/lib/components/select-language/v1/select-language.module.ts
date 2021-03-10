import { NgModule } from '@angular/core';
import { SelectLanguageComponent } from './select-language.component';
import { SharedModule } from '../../../shared/shared.module';
import { SelectModule } from "../../select/v1/select.module";

@NgModule({
  imports: [
    SharedModule,
    SelectModule
  ],
  declarations: [
    SelectLanguageComponent
  ],
  exports: [
    SelectLanguageComponent
  ]
})
export class SelectLanguageModule { }
