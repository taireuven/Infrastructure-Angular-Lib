import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MohTranslateService } from '../translate/moh-translate.service';

@Injectable()
export class MohInterceptor implements HttpInterceptor {
  constructor(private mohTranslateService: MohTranslateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let lang = this.mohTranslateService.currentLang;
    let dir = this.mohTranslateService.direction;

    let checkedReq;
    if (req.method == 'POST' && req.body && !(req.body instanceof FormData)) {
      checkedReq = req.clone({ body: this.checkObj(req.body) });
    }

    const customReq = (checkedReq || req).clone({
      headers: req.headers.set('App-Language', lang || '').set('App-Direction', dir || '')
    });

    // pass on the modified request object
    return next.handle(customReq)

    //.do((ev: HttpEvent<any>) => {

    //  if (ev instanceof HttpResponse) {
    //    console.log('processing response', ev);
    //  }
    //})

    //.catch(response => {

    //  if (response instanceof HttpErrorResponse) {
    //    console.log('Processing http error', response);
    //  }

    //  return Observable.throw(response);
    //});
  }

  /**
   * This function replace the dates values to date string, return the new object.
   * @param objectTocheck The object or array with date values, as FormData.
   */
  checkObj(objectTocheck: any) {
    let checkedObject: any;

    if (objectTocheck instanceof Array) {
      checkedObject = [...objectTocheck];

      for (var i = 0; i < objectTocheck.length; i++) {
        let value = objectTocheck[i];
        if (value instanceof Date) {
          checkedObject[i] = value.toDateString();
        }
        else if (value instanceof Array || value instanceof Object) {
          checkedObject[i] = this.checkObj(value);
        }
      }

    } else {
      checkedObject = { ...objectTocheck };

      for (const key of Object.keys(objectTocheck)) {
        let value = objectTocheck[key];
        if (value instanceof Date) {
          checkedObject[key] = value.toDateString();
        }
        else if (value instanceof Array || value instanceof Object) {
          checkedObject[key] = this.checkObj(value);
        }
      }
    }

    return checkedObject;
  }
}




