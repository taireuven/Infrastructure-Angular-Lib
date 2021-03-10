import { Component, OnInit, Injector, ChangeDetectionStrategy, Input } from '@angular/core';
import { TooltipBase } from '../base/tooltip.base';

/**
 * moh-tooltip shows help icon and a text label that is displayed beside the icon when the user hovers over or longpresses it.
 *
 * ### Usage
  ```html
   <!-- basic tooltip -->
   <moh-tooltip text="example tooltip text"></moh-tooltip>

   <!-- tooltip with text from umbraco -->
   <moh-tooltip textKey="tooltipTextKey" [textParams]="{ param1: 'param1 value'}"></moh-tooltip>

   <!-- tooltip with position -->
   <moh-tooltip location="above"></moh-tooltip>

  ```
 * <example-url>../screenshots/components/v2/tooltip.png</example-url>
 */
@Component({
  selector: 'moh-tooltip',
  templateUrl: './tooltip.v2.component.html',
  styleUrls: ['./tooltip.v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipV2Component extends TooltipBase {
  /**
   * Classes to be passed to the tooltip. Supports the same syntax as ngClass.
   */
  @Input() tooltipClass: string = '';

  constructor(injector: Injector) { super(injector); }
}
