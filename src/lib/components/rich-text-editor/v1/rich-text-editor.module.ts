import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichTextEditorComponent } from './rich-text-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { LabelFieldModule } from '../../label-field/label-field.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CKEditorModule,
    LabelFieldModule
  ],
  declarations: [RichTextEditorComponent],
  exports: [RichTextEditorComponent]
})
export class RichTextEditorModule { }
