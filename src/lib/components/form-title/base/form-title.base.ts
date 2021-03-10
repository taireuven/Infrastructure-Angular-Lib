import { OnInit, Input, Injector, Injectable } from '@angular/core';
import { LabelBase } from '../../base/label-base';
import { Observable } from 'rxjs';
declare var require: any

var Hebcal = require('hebcal');

export class FormTitleBase extends LabelBase implements OnInit {

  /**
   * The text for page title.
   */
  @Input() titleUnderImage: string;
  /**
  * The text key for page title.
  */
  @Input() titleUnderImageKey: string;
  /**
  * The text params for page title.
  */
  @Input() titleUnderImageParams: string;
  /**
  * The url of image.
  */
  @Input() imageUrl: string;
  /**
  * The main text to display.
  */
  @Input() mainImageText: string;
  /**
  * The main text key to display
  */
  @Input() mainImageTextKey: string;
  /**
  * The main params to display
  */
  @Input() mainImageTextParams?: any;
  /**
  * The sub text to display
  */
  @Input() subImageText: string;
  /**
  * The sub text key to display
  */
  @Input() subImageTextKey: string;
  /**
  * The sub params to display
  */
  @Input() subImageTextParams?: any;
  /**
  * The design of the banner text, 'light' | 'dark'.
  */
  @Input() imageTextType: string;
  /**
  * Whether to show message about the required fields.
  */
  @Input() showRequiredFieldsMessage: boolean = true;

  date: Date;
  hebDate: string;
  titleUnderImageTextValue: Observable<string>;
  headerRequiredMessageValue1: Observable<string>;
  headerRequiredMessageValue2: Observable<string>;

  constructor(injector: Injector) {
    super(injector);
    this.date = new Date();
  }
  ngOnInit() {
    this.hebDate = new Hebcal.HDate().toString('h');
    this.titleUnderImageTextValue = this.getLabelText(this.titleUnderImageKey, this.titleUnderImageParams)
    this.headerRequiredMessageValue1 = this.getLabelText('headerRequiredMessagePart1');
    this.headerRequiredMessageValue2 = this.getLabelText('headerRequiredMessagePart2');
  }

}
