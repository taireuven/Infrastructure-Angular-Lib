import { Component, OnInit, ViewEncapsulation, Injector, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { formControlInfo } from '../../../models/formControlInfo';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RatingBase } from '../base/rating.base';
import { MatRadioButton } from '@angular/material';

/**
 * A group of radioButtons with numbers for rating.
 *
 * ### Usage
  ```html

   <!-- basic rating -->
    <moh-rating [options]=rating formControlName="rating" [notRelevantOption]=ratingNFOption labelText='keyOfUmbraco'></moh-rating>

   <!-- rating with some Inputs -->
      <moh-rating [options]=rating formControlName="rating" [notRelevantOption]=ratingNFOption labelText='מעריך את העובדים'
                  MarkAsRequired=true></moh-rating>

  ```
 * <example-url>../screenshots/components/rating.png</example-url>
 */
@Component({
  selector: 'moh-rating',
  templateUrl: './rating.v2.component.html',
  styleUrls: ['./rating.v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingV2Component), multi: true
    },
  ]
})


export class RatingV2Component extends RatingBase {

 /**
 * The unknown option.
 */
  @Input() unknownOption: formControlInfo;

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }
}
