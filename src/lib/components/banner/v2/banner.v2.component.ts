import { Component, ViewEncapsulation, Injector, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BannerBase } from '../base/banner.base';
import { MohTranslateService, MohLangChangeEvent } from '../../../moh-angular-lib.module';
import { Direction } from '../../../models/direction';
import { BreadCrumb } from '../../breadcrumbs/breadcrumbs.module';

/**
 * moh-banner is a component that shows image with text on it.
 *
 * ### Usage
  ```html

   <!-- banner with text Inputs -->
   <moh-banner imageUrl="/assets/images/flower.png" mainText="Main Text"></moh-banner>

   <!-- banner with text key Inputs -->
   <moh-banner imageUrl="/assets/images/flower.png" ltrImageUrl="/assets/images/ltr_flower.png" mainTextKey="mainTextKey"></moh-banner>

   <!-- banner with text key and params Inputs -->
   <moh-banner imageUrl="/assets/images/flower.png" ltrImageUrl="/assets/images/ltr_flower.png" mainTextKey="mainTextKey" [mainTextParams]="{param1:'param 1 value'}"></moh-banner>

   <!-- banner with static breadcrumbs -->
   <moh-banner imageUrl="/assets/images/flower.png" mainText="Main Text" [staticBreadcrumbs]="staticBreadcrumbs"></moh-banner>
  ```
 * #### TS
  ```typescript
    staticBreadcrumbs = [
      { labelKey: "אתר משרד הבריאות", url: "http://www.health.gov.il", isExternal: true, isStatic: true },
      { labelKey: "תשתיות", url: "/" }
  ];
  ```
 * <example-url>../screenshots/components/v2/banner-v2.png</example-url>
 */
@Component({
  selector: 'moh-banner',
  templateUrl: './banner.v2.component.html',
  styleUrls: ['./banner.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerV2Component extends BannerBase implements OnInit {

  /**
   * The url banner image for ltr.
   */
  @Input() ltrImageUrl?: string;
  /**
  * Whether to show the breadcrumbs component.
  */
  @Input() showBreadcrumbs: boolean = true;
  /**
   * The static breadcrumbs.
   */
  @Input() staticBreadcrumbs: BreadCrumb[];


  get isLtr(): boolean {
    return this.mohTranslateService.direction == Direction.LTR;
  }

  constructor(injector: Injector, private mohTranslateService: MohTranslateService) {
    super(injector);
  }

  ngOnInit() {
    if (!this.ltrImageUrl) {
      this.ltrImageUrl = this.imageUrl;
    }
    super.ngOnInit();
  }
}
