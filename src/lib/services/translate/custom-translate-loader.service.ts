import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from "rxjs";
import { TranslateLoader } from "@ngx-translate/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { ConfigService } from '../config/config.service';
import { MohHttpClient } from '../http/http-client';
//import { UmbracoDataService } from '../data/umbraco-data.service';

declare var require: any;
const baseAppName = 'MohBase';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  private mohHttpClient: MohHttpClient;

  private config: ConfigService;

  constructor(private http: HttpClient, private injector: Injector) {
    this.config = injector.get(ConfigService);
    //this.umbracoDataService = injector.get(UmbracoDataService);
    this.mohHttpClient = injector.get(MohHttpClient);
  }

  getTranslation(lang: string): Observable<any> {
    let headers = new HttpHeaders({ "Content-type": "application/json" });

    let appsName = baseAppName + (this.config.baseConfiguration.appName ? ',' + this.config.baseConfiguration.appName : '');

    return Observable.create(observer => {
      //let translations = require("../../../assets/i18n/moj-" + lang + ".json");
      this.mohHttpClient
        .get(this.config.baseConfiguration.umbracoApiURL + lang + '/content/api/v2/dictionary/' + appsName + '/items', { headers: headers, showSpinner: false })
        //this.umbracoDataService.getTranslatedDictionary(lang, this.appsName)
        .subscribe(data => {
          observer.next(data);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }
}
