import { Component, OnInit, ViewEncapsulation, Injector, Input, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { formControlInfo } from '../../../models/formControlInfo';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RatingBase } from '../base/rating.base';
/**
 * A group of radioButtons with numbers for rating.
 *
 * ### Usage
 * ```html

   <!-- basic rating -->
    <moh-rating [options]=rating formControlName="rating" [NROption]=ratingNFOption labelText='keyOfUmbraco'></moh-rating>

   <!-- rating with some Inputs -->
      <moh-rating [options]=rating formControlName="rating" [NROption]=ratingNFOption labelText='מעריך את העובדים'
                  MarkAsRequired=true></moh-rating>

 * ```
 * <example-url>../screenshots/components/rating.png</example-url>
 */
@Component({
  selector: 'moh-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent), multi: true
    },
  ]
})


export class RatingComponent extends RatingBase {

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }

  array(n: number): any[] {
    return Array(n);
  }

  click(code) {
    this.baseAbstractControl.setValue(code);
  }
}
