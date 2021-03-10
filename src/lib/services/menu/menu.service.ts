import { Injectable, Inject } from '@angular/core';
import { MohHttpClient } from '../http/http-client';
import { throwError, Observable } from 'rxjs';
import { IMenuItem } from '../../models/IMenuItem';
import { ConfigService } from '../config/config.service';


@Injectable()
export class MenuService {

  private _getURL = "api/menu/";

  constructor(private http: MohHttpClient, private configService: ConfigService) {
    this._getURL = configService.baseConfiguration.servicesApiURL + this._getURL;
  }

  getMenu(menuId: number, showSpinner: boolean = false): Observable<any> {

    return this.http
      .get<IMenuItem[]>(this._getURL + menuId, { showSpinner: showSpinner});
  }

  private handleError(error: Response) {
    return throwError(error.statusText);
  }
}
