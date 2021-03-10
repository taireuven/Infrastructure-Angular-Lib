import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TextboxV2Module } from '../../textbox/v2/textbox.v2.module';
import { SelectV2Module } from '../../select/v2/select.v2.module';
import { ErrorMessageV2Module } from '../../error-message/v2/error-message.v2.module';
import { DirectivesModule } from '../../../directives/directives.module';

import { AddressV2Component } from './address.v2.component';
import { AddressService } from '../base/address.service';

@NgModule({
  imports: [
    SharedModule,
    TextboxV2Module,
    SelectV2Module,
    ErrorMessageV2Module,
    DirectivesModule
  ],
  declarations: [
    AddressV2Component
  ],
  exports: [
    AddressV2Component
  ],
  providers: [AddressService]
})
export class AddressV2Module { }
