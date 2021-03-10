import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SharedService {
  //This service is shared by the Header and Navbar, and allows the header to have a button that opens the Navbar.


  constructor() { }

  // private emitChangeSource = new Subject<any>();
  // changeEmitted$ = this.emitChangeSource.asObservable();

  // emitChange(change: any) {
  //   this.emitChangeSource.next(change);
  // }


}
