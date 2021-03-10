import { Injectable, Inject, Optional } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { MohHttpClient } from "../http/http-client";
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';


@Injectable()
export class DataService {

  private _getURL = "api/Lists/";
  private _instituteApiURL = "api/InstituteList";

  constructor(private mohHttpClient: MohHttpClient, private configService: ConfigService) {
    this._getURL = configService.baseConfiguration.servicesApiURL + this._getURL;
    this._instituteApiURL = configService.baseConfiguration.servicesApiURL + this._instituteApiURL;
  }

  /**
   * Gets list from org db by list name.
   * @param listName - name of the list.
   */
  getList(listName: string): Observable<HttpResponse<any[]>> {  
    return this.mohHttpClient
      .get(this._getURL + listName, { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("ServiceError: ", error);
        return throwError(error.statusText);
      }));
  }

   /**
   * @ignore
   */
  getListByCode(listCode: string, appId: number = this.configService.baseConfiguration.appId): Observable<HttpResponse<any[]>> {
    return this.mohHttpClient
      .get(this._getURL + appId + '/' + listCode, { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("ServiceError: ", error);
        return throwError(error.statusText);
      }));
  }

  /**
   * Gets edm list from org db by edm list name.
   * @param listName - edm list name
   */
  getEdmList(listName: string): any {
    return this.mohHttpClient
      .get(this._getURL + "edm/" + listName, { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
        return response;
      }),
      catchError((error: HttpResponse<any[]>) => {
        console.log("ServiceError: ", error);
        return throwError(error.statusText);
      }));
  }


  ///**
  // * Gets deticated list from org db.
  // * 
  // */
  getHospitalsList(): any {
    return this.mohHttpClient
      .get(this._instituteApiURL, { showSpinner: false }).pipe(
      map((response: HttpResponse<any[]>) => {
          return response;
        }),
        catchError((error: HttpResponse<any[]>) => {
          console.log("ServiceError: ", error);
          return throwError(error.statusText);
        }));
  }

  getHMOList(): any {
    return this.mohHttpClient
      .get(this._instituteApiURL + "/InstituteHMOList", { showSpinner: false }).pipe(
        map((response: HttpResponse<any[]>) => {
          return response;
        }),
        catchError((error: HttpResponse<any[]>) => {
          console.log("ServiceError: ", error);
          return throwError(error.statusText);
        }));
  }

  getHospitalsAndHMOList(): any {
    return this.mohHttpClient
      .get(this._instituteApiURL + "/HospitalsAndHMOList", { showSpinner: false }).pipe(
        map((response: HttpResponse<any[]>) => {
          return response;
        }),
        catchError((error: HttpResponse<any[]>) => {
          console.log("ServiceError: ", error);
          return throwError(error.statusText);
        }));
  }

  getInstitutes(): any {
    return this.mohHttpClient
      .get(this._instituteApiURL + "/InstitutesList", { showSpinner: false }).pipe(
        map((response: HttpResponse<any[]>) => {
          return response;
        }),
        catchError((error: HttpResponse<any[]>) => {
          console.log("ServiceError: ", error);
          return throwError(error.statusText);
        }));
  }
}
