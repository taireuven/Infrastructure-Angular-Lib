import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { PrintComponent } from "./print.component";
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { ButtonV2Module } from '../button/v2/button.v2.module';

@NgModule({
  imports: [
    SharedModule,
    ButtonV2Module
  ],
  declarations: [
    PrintComponent,
    PrintLayoutComponent
  ],
  exports: [
    PrintComponent,
    PrintLayoutComponent
  ]
})
export class PrintModule { }
