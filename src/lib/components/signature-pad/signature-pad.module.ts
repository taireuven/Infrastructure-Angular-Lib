import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SignaturePadComponent } from './signature-pad.component';
//import { AngularSignaturePadModule } from './angular-signature-pad/angular-signature-pad.module';
import { ButtonV2Module } from '../button/v2/button.v2.module';

@NgModule({
  declarations: [SignaturePadComponent],
  imports: [
    SharedModule,
    //AngularSignaturePadModule.forRoot(),
    ButtonV2Module
  ],
  exports: [SignaturePadComponent]
})
export class SignaturePadModule { } 
