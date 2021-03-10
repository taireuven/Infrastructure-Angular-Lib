import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FormArrayTemplateComponent } from './form-array-template.component';
import { MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [FormArrayTemplateComponent],
  exports: [FormArrayTemplateComponent]
})
export class FormArrayTemplateModule { }
