import { NgModule, APP_INITIALIZER, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { MessageType, ModalService } from './services/modal/modal.service';
import { DataService } from './services/data/data.service';
import { FormSubmitService } from './services/form-submit/form-submit.service';
import { MohHttpClient, mohHttpClientCreator } from './services/http/http-client';
import { WorkflowGuard } from './components/wizard-route/base/workflow-guard.service';
import { WizardDeactivateGuard } from './components/wizard-route/base/wizard-deactivate-guard.service';
import { WizardDataService } from './components/wizard-route/base/wizardData.service';
import { UmbracoDataService } from './services/data/umbraco-data.service';
import { MohTranslateService } from './services/translate/moh-translate.service';
import { AbstractControlUtilsService } from './components/base/abstract-control-utils.service';
import { ConfigService } from './services/config/config.service';
import { MohUtilsService } from './services/utils/moh-utils.service';
import { MohInterceptor } from './services/http/moh.interceptor';
import { SharedService } from "./services/shared/shared.service";
import { BreadcrumbsService } from './components/breadcrumbs/breadcrumbs.service';
import { DraftService } from './services/draft/draft.service';
import { JsonDataService } from './services/data/json-data.service';
import { PrintService } from './components/print/print.service';
import { AddressService } from './components/address/base/address.service';

export * from './services/modal/modal.service';
export { DataService } from './services/data/data.service';
export { FormSubmitService } from './services/form-submit/form-submit.service';
export { SharedService } from "./services/shared/shared.service";
export { WorkflowGuard } from './components/wizard-route/base/workflow-guard.service';
export { PrintService } from './components/print/print.service';
export { WizardDeactivateGuard } from './components/wizard-route/base/wizard-deactivate-guard.service';
export { WizardDataService } from './components/wizard-route/base/wizardData.service';
export * from './services/http/http-client';
export { UmbracoDataService } from './services/data/umbraco-data.service';
export { JsonDataService } from './services/data/json-data.service';
export { MohTranslateService, MohLangChangeEvent } from './services//translate/moh-translate.service';
export { AbstractControlUtilsService } from './components/base/abstract-control-utils.service';
export { ConfigService } from './services/config/config.service';
export { DraftService } from './services/draft/draft.service';
export { MohUtilsService } from './services/utils/moh-utils.service';
export { AddressService } from './components/address/base/address.service';


export function Initialize(utils: MohUtilsService, configFileUrl: string) {
  const fn = () => utils.initialize(configFileUrl);
  return (fn);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class MohPackageModule {
  static configure(configFileUrl: string) {
    return {
      ngModule: MohPackageModule,
      providers: [
        { provide: 'configFileUrl', useValue: configFileUrl },
        {
          provide: APP_INITIALIZER,
          useFactory: (Initialize),
          deps: [MohUtilsService, 'configFileUrl'],
          multi: true
        }
      ]
    }
  }

  static forRoot() {
    return {
      ngModule: MohPackageModule,
      providers: [
        ModalService,
        DataService,
        UmbracoDataService,
        JsonDataService,
        FormSubmitService,
        MohTranslateService,
        SharedService,
        WorkflowGuard,
        WizardDataService,
        WizardDeactivateGuard,
        AbstractControlUtilsService,
        ConfigService,
        MohUtilsService,
        BreadcrumbsService,
        DraftService,
        PrintService,
        AddressService,
        // Providing the ApplicationHttpClient so it could be used as a service.
        {
          provide: MohHttpClient,
          useFactory: mohHttpClientCreator,
          deps: [HttpClient]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MohInterceptor,
          multi: true
        }
      ]
    }
  }
}
