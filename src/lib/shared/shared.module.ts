import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomTranslateLoader } from '../services/translate/custom-translate-loader.service';
import { SafeHtmlPipe } from '../components/rich-text-message/safe-html.pipe';
// import { UmbracoDataService } from '../services/data/umbraco-data.service';

export function createTranslateLoader(http: HttpClient, injector: Injector) {
  return new CustomTranslateLoader(http, injector);
}

// @dynamic
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,//(http: HttpClient, injector: Injector) => new CustomTranslateLoader(http, injector),
        deps: [HttpClient, Injector]
      }
    }),
  ],
  declarations: [SafeHtmlPipe],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SafeHtmlPipe
  ]
})
export class SharedModule { }
