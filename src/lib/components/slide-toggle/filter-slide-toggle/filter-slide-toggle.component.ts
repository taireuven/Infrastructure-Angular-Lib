import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Injector, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SlideToggleBase } from '../base/slide-toggle.base';

@Component({
  selector: 'moh-filter-slide-toggle',
  templateUrl: './filter-slide-toggle.component.html',
  styleUrls: ['./filter-slide-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FilterSlideToggleComponent), multi: true
    }]
})
export class FilterSlideToggleComponent extends SlideToggleBase {

  constructor(injector: Injector, cdr: ChangeDetectorRef) {
    super(injector, cdr);
  }
}
