import { Injectable } from '@angular/core';
import { DataService } from '../../../moh-angular-lib.module';
import { BehaviorSubject , Observable } from 'rxjs';
import { Prefix } from './Telephone';

@Injectable()
export class TelephoneService {

  phonePrefixSubject: BehaviorSubject<Prefix[]> = new BehaviorSubject([])
  isFirstRequest: boolean = true;

  constructor(private dataService: DataService) {}

  getPhonePrefix() {
    if (this.isFirstRequest) {
      this.dataService.getEdmList("PhonePrefix").subscribe(
        data => {
          data = data ? data.map(item => new Prefix(item.Code, item.Text)) : data;
          this.phonePrefixSubject.next(data);

        }, error => {
          this.phonePrefixSubject.next(null);
        }
      );
    }
    this.isFirstRequest = false;
    return this.phonePrefixSubject.asObservable();
  }
}
