import { NgModule } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { DateSelectComponent } from "./date-select.component";
import { LabelFieldModule } from "../../label-field/label-field.module";
import { SelectModule } from "../../select/v1/select.module";
import { TextboxModule } from "../../textbox/v1/textbox.module";
import { ErrorMessageModule } from '../../error-message/v1/error-message.module';

@NgModule({
  imports: [
    SharedModule,
    LabelFieldModule,
    SelectModule,
    TextboxModule,
    ErrorMessageModule
  ],
  declarations: [
    DateSelectComponent
  ],
  exports: [
    DateSelectComponent
  ]
})
export class DateSelectModule { }
