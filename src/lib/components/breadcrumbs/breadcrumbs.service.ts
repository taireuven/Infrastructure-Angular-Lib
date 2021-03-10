import {distinctUntilChanged, filter} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BreadcrumbsService {
  routeChanged: BehaviorSubject<NavigationEnd> = new BehaviorSubject<NavigationEnd>(null);

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => {
        return event instanceof NavigationEnd
      }),
      distinctUntilChanged())
      .subscribe((event:NavigationEnd) => this.routeChanged.next(event));
  }

}
