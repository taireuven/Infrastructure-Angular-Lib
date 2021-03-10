import { Component, OnInit, Input } from '@angular/core';
/**
 * The Dashboard summary component
 *
 * ### Usage
  ```html

    <!-- basic card -->
    <div fxLayout="row wrap" fxLayout.lt-md="column" style="margin: 0 -15px;">
      <moh-dashboard-card fxFlex="33.33" [chartOptions]="chartOneData" [title]="My Title">
        <moh-dashboard-card-summary
        [title]="'Supplies'"
        [value]="'$500'"
        [description]="'This is a sample description'"
        ></moh-dashboard-card-summary>
      </moh-dashboard-card>

    </div>
  ```
*/
@Component({
  selector: 'moh-dashboard-card-summary',
  templateUrl: './dashboard-card-summary.component.html',
  styleUrls: ['./dashboard-card-summary.component.scss']
})
export class DashboardCardSummaryComponent implements OnInit {

  constructor() { }

  /**
   * The value to display.
   */
  @Input() value: string | number;
  /**
   * The URL of the component.
   */
  @Input() url?: string;
  /**
   * The title to display
   */
  @Input() title: string;
  /**
   * The text underneath the component
   */
  @Input() description?: string;
  ngOnInit() {

  }

}
