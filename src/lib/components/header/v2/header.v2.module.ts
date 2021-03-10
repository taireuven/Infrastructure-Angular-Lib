import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ButtonV2Module } from '../../button/v2/button.v2.module';
import { TextboxV2Module } from '../../textbox/v2/textbox.v2.module';
import { SelectLanguageV2Module } from '../../select-language/v2/select-language.v2.module';
import { HeaderV2Component } from './header.v2.component';
import { StickySectionModule } from '../../sticky-section/sticky-section.module';
import { NavbarV2Module } from '../../menu/navbar/v2/navbar.v2.module';

export { HeaderV2Component } from './header.v2.component';

@NgModule({
  imports: [
    SharedModule,
    ButtonV2Module,
    SelectLanguageV2Module,
    TextboxV2Module,
    NavbarV2Module,
    StickySectionModule
  ],
  declarations: [
    HeaderV2Component
  ],
  exports: [
    HeaderV2Component
  ]
})
export class HeaderV2Module { }

