import { Component, ViewEncapsulation, Injector, Input, OnInit } from '@angular/core';
import { BannerBase } from '../base/banner.base';
import { Observable } from 'rxjs';

/**
 * moh-banner is a component that shows image with text on it.
 *
 * ### Usage
 * ```html

   <!-- banner with text Inputs -->
   <moh-banner imageUrl="/assets/images/flower.png" textType="light" mainText="Main Text" subText="Sub Text"></moh-banner>

   <!-- banner with text key Inputs -->
   <moh-banner imageUrl="/assets/images/flower.png" textType="light" mainTextKey="mainTextKey" subTextKey="subTextKey"></moh-banner>

   <!-- banner with text key and params Inputs -->
   <moh-banner imageUrl="/assets/images/flower.png" textType="light"
      mainTextKey="mainTextKey" [mainTextParams]="{param1:'param 1 value'}" subTextKey="subTextKey"></moh-banner>

 * ```
 * <example-url>../screenshots/components/v1/banner.png</example-url>
 */
@Component({
  selector: 'moh-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent extends BannerBase implements OnInit {
  /**
   * The sub text to display on banner.
   */
  @Input() subText: string;
  /**
   * The sub text key to display on banner.
   */
  @Input() subTextKey: string;
  /**
   * The sub text params, get object contains key and value for any param.
   */
  @Input() subTextParams?: any;
  /**
   * The design of the text, 'light' | 'dark' (set to element class name).
   */
  @Input() textType = "dark";


  subTextValue: Observable<string>;
  
  constructor(injector:Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subTextValue = this.getLabelText(this.subTextKey, this.subTextParams);
  }
}
