import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequestOptions {
  headers?: HttpHeaders;
  showSpinner?: boolean;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function mohHttpClientCreator(http: HttpClient) {
  return new MohHttpClient(http);
}

@Injectable()
export class MohHttpClient {

  private api = '';//'https://someurl.example';

  // Extending the HttpClient through the Angular DI.
  public constructor(public http: HttpClient) {
    // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
    // for ex. this.httpClient.http.get(...)
  }

  /**
   * GET request
   * @param endPoint it doesn't need / in front of the end point
   * @param options options of the request like headers, body, etc.
   * @returns
   */
  public get<T>(endPoint: string, options: IRequestOptions = {}): Observable<T> {
    this.setSpinnerHeader(options)
    return this.http.get<T>(this.api + endPoint, options);
  }


  /**
   * POST request
   * @param endPoint end point of the api
   * @param params body of the request.
   * @param options options of the request like headers, body, etc.
   * @returns
   */
  public post<T>(endPoint: string, params: object, options: IRequestOptions = {}): Observable<T> {
    this.setSpinnerHeader(options)
    return this.http.post<T>(this.api + endPoint, params, options);
  }

  /**
   * PUT request
   * @param endPoint end point of the api
   * @param params body of the request.
   * @param options options of the request like headers, body, etc.
   * @returns
   */
  public put<T>(endPoint: string, params: object, options: IRequestOptions = {}): Observable<T> {
    this.setSpinnerHeader(options)
    return this.http.put<T>(this.api + endPoint, params, options);
  }

  /**
   * DELETE request
   * @param endPoint end point of the api
   * @param options options of the request like headers, body, etc.
   * @returns
   */
  public delete<T>(endPoint: string, options: IRequestOptions = {}): Observable<T> {
    this.setSpinnerHeader(options)
    return this.http.delete<T>(this.api + endPoint, options);
  }

  private setSpinnerHeader(options: IRequestOptions) {
    let headers = options.headers || new HttpHeaders();
    options.headers = headers.set('show-spinner', (options.showSpinner ? 'true' : 'false'));
  }
}
