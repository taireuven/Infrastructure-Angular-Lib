import { Component, OnInit, Input, Injector, ChangeDetectionStrategy } from '@angular/core';
import { LabelBase } from '../base/label-base';

@Component({
  selector: 'moh-label-field',
  templateUrl: './label-field.component.html',
  styleUrls: ['./label-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelFieldComponent extends LabelBase implements OnInit{

  @Input() text: string = "";
  @Input() labelStyle: string;
  @Input() isRequired: boolean;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

}
