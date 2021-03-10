import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { MohTranslateService, MohLangChangeEvent } from '../translate/moh-translate.service';
import { MohHttpClient } from '../http/http-client';
import { ConfigService } from '../config/config.service';;

@Injectable()
export class JsonDataService {

  private _jsonListsPrefixURL: string;// = "/assets/lists/";
  private _jsonListsSuffixURL: string;
  private listsJsonSubject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private configService: ConfigService, private mohHttpClient: MohHttpClient, private mohTranslateService: MohTranslateService) {
    this._jsonListsPrefixURL = this.configService.baseConfiguration.jsonListsPrefixURL;
    this._jsonListsSuffixURL = this.configService.baseConfiguration.jsonListsSuffixURL;
    if (this._jsonListsSuffixURL == null) {
      this._jsonListsSuffixURL = '.json';
    }

    if (this._jsonListsPrefixURL) {
      this.loadJson(this.mohTranslateService.currentLang);

      this.mohTranslateService.onLangChange.subscribe((event: MohLangChangeEvent) => {
        this.loadJson(event.lang.code);
      });
    }
  }

  loadJson(lang) {
    let url = this._jsonListsPrefixURL + lang + this._jsonListsSuffixURL;

    this.mohHttpClient.get(url, { showSpinner: false })
      .subscribe((json: any) => this.listsJsonSubject.next(json));
  }

  /**
   * get list from json file, according to jsonListsPrefixURL & jsonListsSuffixURL config values
   * @param listName the property name in json object that contain the list.
   */
  getList(listName: string): Observable<any[]> {
    return this.listsJsonSubject.asObservable().map((json: any) => json ? (json[listName] || []) : []);
  }

  /**
   * get the 'language' list from json file, according to jsonListsPrefixURL & jsonListsSuffixURL config values
   */
  getLanguages(): Observable<any[]> {
    return this.getList('language');
  }
}
