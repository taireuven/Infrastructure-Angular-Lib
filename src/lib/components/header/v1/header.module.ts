import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonModule } from '../../button/v1/button.module';
import { SelectLanguageModule } from '../../select-language/v1/select-language.module';
import { HeaderComponent } from './header.component';


@NgModule({
  imports: [
    SharedModule,
    ButtonModule,
    SelectLanguageModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
