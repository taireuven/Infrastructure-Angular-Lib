import { Component, ViewEncapsulation, Injector} from '@angular/core';
import { TooltipBase } from '../base/tooltip.base';

/**
 * moh-tooltip shows help icon and a text label that is displayed beside the icon when the user hovers over or longpresses it.
 *
 * ### Usage
 * ```html
   <!-- basic tooltip -->
   <moh-tooltip text="example tooltip text"></moh-tooltip>

   <!-- tooltip with text from umbraco -->
   <moh-header textKey="tooltipTextKey" [textParams]="{ param1: 'param1 value'}"></moh-header>

   <!-- tooltip with position -->
   <moh-header location="above"></moh-header>

 * ```
 * <example-url>../screenshots/components/v1/tooltip.png</example-url>
 */
@Component({
  selector: 'moh-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TooltipComponent extends TooltipBase{
  constructor(injector: Injector) { super(injector); }
}
