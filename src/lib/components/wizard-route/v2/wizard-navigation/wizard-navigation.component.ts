import { Component, OnInit, Host, ViewEncapsulation } from '@angular/core';
import { WizardRouteV2Component } from '../wizard-route.v2.component';

/**
 * @ignore
 */
@Component({
  selector: 'moh-wizard-navigation',
  templateUrl: './wizard-navigation.component.html',
  styleUrls: ['./wizard-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WizardNavigationComponent implements OnInit {

  constructor(@Host() public wizardRoute: WizardRouteV2Component) {}

  ngOnInit() {
    
  }

}
