import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
// import * as Highcharts from 'highcharts';
import { IMenuItem } from '../../../models/IMenuItem';
import { Router } from '@angular/router';
/**
 * The Dashboard card component
 *
 * ### Usage
  ```html

    <!-- basic card with HTML-->
    <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
      <moh-dashboard-card fxFlex="33.33" [title]="My Title" icon="envelope" iconColor="red">
        <p>Sample text</p>
      </moh-dashboard-card>
    </div>

    <!-- multiple cards -->
    <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
      <moh-dashboard-card fxFlex="33.33" [title]="My Title"></moh-dashboard-card>
      <moh-dashboard-card fxFlex="66.66" [title]="My Title"></moh-dashboard-card>
      <moh-dashboard-card fxFlex="50"></moh-dashboard-card>
      <moh-dashboard-card fxFlex="50"></moh-dashboard-card>
    </div>

    <!-- card with menu items -->
    <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
      <moh-dashboard-card fxFlex="33.33" [title]="My Title" [menuItems]="menuItems"></moh-dashboard-card>
    </div>
  ```
*
* #### TS
 ```typescript
  menuItems?: IMenuItem[] = [
    { title: 'wizard', url: '/v2/wizard' },
    { title: 'alert', url: '', triggerFunction: function(){alert('Hi!');} },
  ];
 ```
*/
@Component({
  selector: 'moh-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class DashboardCardComponent implements OnInit {
  /**
   * The title that should display above the card.
   */
  @Input() title?: string;
  /**
   * The menu to display inside the card.
   */
  @Input() menuItems?: IMenuItem[];
  /**
   * Whether to center the ng-content
   */
  @Input() center?: boolean;
  /**
   * The moh-icon to display.
   */
  @Input() icon?: string;
  /**
   *   The color of the icon
   */
  @Input() iconColor: 'red' | 'blue' | 'green' | 'orange' = "orange";
  // @Input() iconColor?: 'danger' | 'success' | 'normal' | 'good' = 'normal';

  constructor( public router: Router) { }

  ngOnInit() {
    // this.chartOptions.credits.enabled = false;
    // this.headerRequiredMessageValue2 = this.getLabelText('headerRequiredMessagePart2');

  }

  onItemSelected(item: IMenuItem) {
      if (item.triggerFunction) {
        item.triggerFunction();
        if (item.url.length < 1){
          return;
        }
      }
      if (item.isExternal) {
        window.open(item.url, item.isStatic ? '_blank' : '_self');
      }
      else {
        this.router.navigate([item.url]);
      }

  }

}
