import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DataService } from '../../../services/data/data.service';

@Injectable()
export class AddressService {

  private _cities: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _streets: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private dataService: DataService
  ) {
    this.loadCities();
    this.loadStreets();
  }

  loadCities() {
    this.dataService.getEdmList("IsraelCities").subscribe(data => {
      this._cities.next(data);
    }, error => {
      this._cities.next(null);
    });
  }

  loadStreets() {
    this.dataService.getEdmList("IsraelStreets").subscribe(data => {
      this._streets.next(data);
    }, error => {
      this._streets.next(null);
    });
  }

  getCities(): Observable<any[]> {
    return this._cities.asObservable();
  }

  getStreets(): Observable<any[]> {
    return this._streets.asObservable();
  }
}
