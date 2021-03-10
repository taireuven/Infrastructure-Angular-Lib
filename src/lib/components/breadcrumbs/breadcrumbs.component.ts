import { Component, OnInit, Input, Injector, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LabelBase } from '../base/label-base';
import { BreadcrumbsService } from './breadcrumbs.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The BreadCrumb interface for moh-breadCrumbs component.
 */
export interface BreadCrumb {
  /**
  * The label key of the breadcrumb.
  */
  labelKey: string;
  /**
  * The url of the breadcrumb.
  */
  url: string;
  /**
  * Whether the url is external of this current application.
  */
  isExternal?: boolean;
  /**
  * Whether to open the url in new tab.
  */
  isStatic?: boolean;
};

/**
 * moh-breadcrumbs is a component that shows breadcrumbs by the application routing.
 * Based on https://medium.com/@bo.vandersteene/angular-5-breadcrumb-c225fd9df5cf.
 *
 * ### Usage
  ```html

   <!-- basic breadcrumbs -->
   <moh-breadcrumbs></moh-breadcrumbs>

   <!-- breadcrumbs with static breadcrumbs -->
   <moh-breadcrumbs [staticBreadcrumbs]="staticBreadcrumbs"></moh-breadcrumbs>
 * ```
 * #### TS
 * your-component.ts
  ```typescript
    staticBreadcrumbs = [
      { labelKey: "breadcrumb_label_key_1", url: "http://example.com", isExternal: true, isStatic: true },
      { labelKey: "breadcrumb_label_key_2", url: "/" }
    ];
  ```
 * You need to give a data parameter with the label of your breadcrumb for each route that you want to add to the breadcrumbs.
 * ```typescript
    {
      path: 'forms',
      data: {
        breadcrumb: 'forms'
      },
      children: [
        {
            path: 'details',
            component: ContentComponent,
            data: {
                breadcrumb: 'details'
            },
        },
      ]
    }
  ```
 * <example-url>../screenshots/components/breadcrumbs.png</example-url>
 */
@Component({
  selector: 'moh-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BreadcrumbsComponent extends LabelBase implements OnInit {
  /**
   * The static breadcrumbs.
   */
  @Input() staticBreadcrumbs: BreadCrumb[];

  breadcrumbs$: Observable<BreadCrumb[]>;

  constructor(injector: Injector, private router: Router, private activatedRoute: ActivatedRoute, private breadcrumbsService: BreadcrumbsService) {
    super(injector);

    this.breadcrumbs$ = breadcrumbsService.routeChanged.pipe(map(event => this.buildBreadCrumb(this.activatedRoute.root, '', this.staticBreadcrumbs)));
    //Build your breadcrumb starting with the root route of your current activated route.
    //The subscription to the routeChanged event is done on singleton service because the first route event catched just from the root.
  }

  ngOnInit() { }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    //If no routeConfig is avalailable we are on the root path
    let newBreadcrumbs: Array<BreadCrumb> = breadcrumbs;
    let nextUrl = `${url}/`;
    if (route && route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb']) {
      const label = route.routeConfig.data['breadcrumb'];
      const path = route.routeConfig.path;
      //In the routeConfig the complete path is not available, 
      //so we rebuild it each time
      nextUrl = `${url}${path}/`;
      const breadcrumb: BreadCrumb = {
        labelKey: label,
        url: nextUrl
      };
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    }
    if (route.firstChild) {
      //If we are not on our current path yet, 
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }

}
