import { Injectable, Inject, Injector } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MohHttpClient } from '../http/http-client';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { MohTranslateService } from '../translate/moh-translate.service';

@Injectable()
export class UmbracoDataService {

  private _getOmbracoURL = "content/api/";
  private _getPrefixUmbracoURL: string;

  constructor(private configService: ConfigService, private mohHttpClient: MohHttpClient, private translateService: MohTranslateService) {  
    this._getPrefixUmbracoURL = configService.baseConfiguration.umbracoApiURL;
  }

  /**
   * Gets a list from umbraco by docType and by current app language.
   * @param docType the docType name.
   * @param apps string separated by commas. If not sent, the function will return infrastructure's list.
   * @param select defines which properties of the object to return.
   * @param filter defines a filter on the list.
   */
  getList(docType: string, apps?: string, select?: string, filter?: string): Observable<HttpResponse<any[]>> {
    let calture = this.translateService.currentLang;
    return this.mohHttpClient
      .get(this._getPrefixUmbracoURL + calture + '/' + this._getOmbracoURL + docType + (apps ? '/' + apps : '') + '/items' + (select ? '/' + select : '') +
      (filter && select ? '/' + filter : (filter && !select ? '?filter=' + filter : '')),
    { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("UmbracoServiceError: ", error);
        return throwError(error.statusText);
      }));
  }

   /**
    * Gets a list from umbraco by docType and by given culture.
    * @param calture language code.
    * @param docType the docType to return from umbaco
    * @param apps apps should be sent as a string separated by commas. If not sent, the function will return infrastructure's list.
    * @param select defines which properties of the object to return.
    * @param filter defines a filter on the list.
    */
  getTranslatedList(calture: string, docType: string, apps?: string, select?: string, filter?: string): Observable<HttpResponse<any[]>> {
    return this.mohHttpClient
      .get(this._getPrefixUmbracoURL + calture + '/' + this._getOmbracoURL + docType + (apps ? '/' + apps : '') + '/items' + (select ? '/' + select : '') +
      (filter && select ? '/' + filter : (filter && !select ? '?filter=' + filter : '')),
      { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("UmbracoServiceError: ", error);
        return throwError(error.statusText);
      }));
  }
  
  /**
   * Gets the list of languages from umbraco.
   * @param apps apps should be sent as a string separated by commas. If sent, the function will return a combined list of all given apps languages. If not sent, the function will return infrastructure's languages list.
   */
  getLanguages(apps?: string) {
    return this.mohHttpClient
      .get(this._getPrefixUmbracoURL + this._getOmbracoURL + 'languages' + (apps ? '/' + apps : '') + '/items', { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("UmbracoServiceError: ", error);
        return throwError(error.statusText);
      }));
  }

  /**
   * Gets docTypes that inherit dictionary from umbraco by app current language.
   * @param apps apps should be sent as a string separated by commas. If sent, the function will return a combined list of dictionaries of all given apps + infrastructure's dictionaries list. If not sent, the function will return infrastructure's dictionaries list.
   */
  getDictionary(apps?: string): Observable<HttpResponse<any[]>> {
    let calture = this.translateService.currentLang;
    return this.mohHttpClient
      .get(this._getPrefixUmbracoURL + calture + '/' + this._getOmbracoURL + 'v2/dictionary' + (apps ? '/' + apps : '') + '/items', { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("UmbracoServiceError: ", error);
        return throwError(error.statusText);
      }));
  }

  /**
   * Gets docTypes that inherit dictionary from umbraco by given culture.
   * @param calture language code.
   * @param apps apps should be sent as a string separated by commas. If sent, the function will return a combined list of dictionaries of all given apps + infrastructure's dictionaries list. If not sent, the function will return infrastructure's dictionaries list.
   */
  getTranslatedDictionary(calture: string, apps?: string): Observable<HttpResponse<any[]>> {
    return this.mohHttpClient
      .get(this._getPrefixUmbracoURL + calture + '/' + this._getOmbracoURL + 'v2/dictionary' + (apps ? '/' + apps : '') + '/items', { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("UmbracoServiceError: ", error);
        return throwError(error.statusText);
      }));
  }
}
