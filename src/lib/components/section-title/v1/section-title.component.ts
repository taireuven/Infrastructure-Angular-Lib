import { Component, ViewEncapsulation, Injector } from '@angular/core';

import { SectionTitleBase } from '../base/section-title.base';

/**
 * A layout section title with icon and numbering.
 *
 * ### Usage
 * ```html

   <!-- basic section-title -->
   <moh-section-title title="מגיש הבקשה:"></moh-section-title>

   <!-- section-title with number and icon-->
   <moh-section-title number="1" title="מגיש הבקשה:" icnName="perm_identity"></moh-section-title>

   <!-- section-title with titleKey, number and image-->
   <moh-section-title number="1" textKey="sectionTitleKey" imgSrc="my_image_path"></moh-section-title>

 * ```
 * <example-url>../screenshots/components/v1/section-title.png</example-url>
 */
@Component({
  selector: 'moh-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionTitleComponent extends SectionTitleBase {
  constructor(injector: Injector) { super(injector); }
}
