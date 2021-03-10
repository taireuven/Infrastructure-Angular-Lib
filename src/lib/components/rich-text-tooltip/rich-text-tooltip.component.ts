import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
/**
 * The Rich Text Tooltip Component
 *
 *
 *
 * ### Usage:
  ```html

   <!-- with HTML String -->
   <moh-rich-text-tooltip [html]="string">
    <p>
       ...Content...
    </p>
   </moh-rich-text-tooltip>

   <!-- with inline HTML -->
   <moh-rich-text-tooltip>
      <p>
       ...Content...
      </p>
      <div tooltip-content-section>
        <p>...Tooltip HTML...</p>
      </div>
   </moh-rich-text-tooltip>

  ```
 */
@Component({
  selector: 'moh-rich-text-tooltip',
  templateUrl: './rich-text-tooltip.component.html',
  styleUrls: ['./rich-text-tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RichTextTooltipComponent implements OnInit {
  @Input() html?: string;
  constructor() { }

  ngOnInit() {
  }

}
