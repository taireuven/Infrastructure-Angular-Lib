import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { TextboxModule } from '../../textbox/v1/textbox.module';
import { SelectModule } from '../../select/v1/select.module';
import { ErrorMessageModule } from '../../error-message/v1/error-message.module';
import { DirectivesModule } from '../../../directives/directives.module';

import { AddressComponent } from './address.component';
import { AddressService } from '../base/address.service';

@NgModule({
  imports: [
    SharedModule,
    TextboxModule,
    SelectModule,
    ErrorMessageModule,
    DirectivesModule
  ],
  declarations: [
    AddressComponent
  ],
  exports: [
    AddressComponent
  ],
  providers:[AddressService]
})
export class AddressModule { }
