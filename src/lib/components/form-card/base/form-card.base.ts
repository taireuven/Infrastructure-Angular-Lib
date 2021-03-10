import { Component, OnInit, Input, Injector } from '@angular/core';
import { LabelBase } from '../../base/label-base';
import { Observable } from 'rxjs';

export class FormCardBase extends LabelBase implements OnInit {
  /**
  * The key of the text in umbraco to show as the title
  */
  @Input() titleKey: string;

  constructor(injector: Injector) { super(injector); }

  ngOnInit() {
  }
}
