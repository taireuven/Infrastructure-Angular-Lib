import { Component, Input, ViewEncapsulation, Injector, Injectable, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MohTranslateService } from "../../../services/translate/moh-translate.service";
import { Observable } from 'rxjs';
import { LabelBase } from '../../base/label-base';

export class BannerBase extends LabelBase implements OnInit, OnChanges {

  /**
   * The url of banner image.
   */
  @Input() imageUrl: string;
  /**
   * The main text to display on banner.
   */
  @Input() mainText: any;
  /**
   * The main text key to display on banner.
   */
  @Input() mainTextKey: string;
  /**
   * The sub text params, get object contains key and value for any param.
   */
  @Input() mainTextParams?: any;
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
  /**
   * Set if the text over the banner gets a gradient background to cover the image behind.
   */
  @Input() dynamicFadePic = false;

  subTextValue: Observable<string>;

  mainTextValue: Observable<string>;



  constructor(protected injector: Injector) { super(injector); }

  ngOnInit() {
    //this.mainTextValue = this.getLabelText(this.mainTextKey, this.mainTextParams);
    //this.subTextValue = this.getLabelText(this.subTextKey, this.subTextParams);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mainTextValue = this.isInputChange(changes.mainTextKey) ? this.getLabelText(this.mainTextKey, this.mainTextParams) : this.mainTextValue;
    this.subTextValue = this.isInputChange(changes.subTextKey) ? this.getLabelText(this.subTextKey, this.subTextParams) : this.subTextValue;
  }

  private isInputChange(inputChanges) {
    return (inputChanges && inputChanges.currentValue != inputChanges.previousValue);
  }
}
