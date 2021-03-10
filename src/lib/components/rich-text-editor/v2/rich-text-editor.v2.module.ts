import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { LabelFieldModule } from '../../label-field/label-field.module';
import { RichTextEditorV2Component } from './rich-text-editor.v2.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule,
    LabelFieldModule
  ],
  declarations: [RichTextEditorV2Component],
  exports: [RichTextEditorV2Component]
})
export class RichTextEditorV2Module { }
