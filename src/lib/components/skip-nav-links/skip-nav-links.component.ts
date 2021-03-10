import { Component, OnInit, Input, ViewEncapsulation, Injector, ChangeDetectionStrategy } from '@angular/core';
import { LabelBase } from '../base/label-base';
import { Observable } from 'rxjs';

@Component({
  selector: 'moh-skip-nav-links',
  templateUrl: './skip-nav-links.component.html',
  styleUrls: ['./skip-nav-links.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkipNavLinksComponent extends LabelBase implements OnInit {

  @Input() skipToMainMenu: boolean = false;
  @Input() skipToSubMenu: boolean = false;
  @Input() skipToMainContent: boolean = true;

  skipToMainMenuTextValue: Observable<string>;
  skipToSubMenuTextValue: Observable<string>;
  skipToMainContentTextValue: Observable<string>;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    this.skipToMainMenuTextValue = this.getLabelText('skipToMainMenu');
    this.skipToSubMenuTextValue = this.getLabelText('skipToSubMenu');
    this.skipToMainContentTextValue = this.getLabelText('skipToMainContent');
  }

  skipTo = (id): void => {
    var element = document.getElementById(id);
    if(id=="mainContent"){
      var focusElements = <HTMLElement><unknown>element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      focusElements[0].focus()
    }
    else{
      var element = document.getElementById(id);
      element.focus();
    }
  };

}
