import {take} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MohHttpClient } from '../http/http-client';
import { ConfigService } from '../config/config.service';
import { draft } from '../../models/draft';
@Injectable({
  providedIn: 'root'
})
export class DraftService {

  draftUrl: string; 

  constructor(private http: MohHttpClient, configService: ConfigService) {
    this.draftUrl = configService.baseConfiguration.draftApi;
  }

  addDraft(draftItem: draft): Observable<any> {
    return this.http.post(this.draftUrl, draftItem, {}).pipe(take(1));
  }
  getDraft(draftID): Observable<any> {
    return this.http.get(this.draftUrl + draftID).pipe(take(1));
  }
  updateDraft(draftItem: draft): Observable<any> {
    return this.http.post(this.draftUrl, draftItem, {}).pipe(take(1));
  }
  deleteDraft(draftID): Observable<any> {
    return this.http.get(this.draftUrl + draftID).pipe(take(1));
  }

}
