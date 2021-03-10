import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MohHttpClient } from "../../services/http/http-client";

@Injectable({
  providedIn: 'root'
})

export class LoginCubeService {

  private userNameSubject: BehaviorSubject<any> = new BehaviorSubject('');
  userNameValue: Observable<any> = this.userNameSubject.asObservable();

  constructor(private http: MohHttpClient) {
    this.initUserName();
  }

  initUserName() {
    this.http.get('/api/Login/GetUserName', { showSpinner: true }).subscribe((response: string) => {
      this.userNameSubject.next(response);
    });
  }


  getUserName(): Observable<any> {
    return this.http.get('/api/Login/GetUserName', { showSpinner: true });
  }
}
