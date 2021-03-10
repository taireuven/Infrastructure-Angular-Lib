import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { MohHttpClient } from '../../../services/http/http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FooterService {

  constructor(private _http: MohHttpClient) { }

  getFooterItems(): Observable<any> {
    return this._http.get("/assets/data/menuItems.json").pipe(
      map((response: any) => {
        return response;
      }));
  }
    getFooterV2Items(): Observable<any> {
    return this._http.get("/assets/data/menuItems.v2.json").pipe(
      map((response: any) => {
        return response;
      }));
  }
}

export class FooterMenuItem {
  Path: string;
  Controller: string;
  ComponentName: string;
  TitleKey: string;
  AuthRequired: boolean;
  ImgUrl: string;
  ImgUrlLtr: string;
  IsStatic: boolean;
  IconName: string;
}
