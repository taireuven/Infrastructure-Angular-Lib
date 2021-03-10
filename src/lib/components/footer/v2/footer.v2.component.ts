import { Component, ViewEncapsulation, Injector, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { FooterBase } from '../base/footer.base';
import { Observable ,  Subscription } from 'rxjs';
import { IMenuItem } from '../../../models/IMenuItem';
import { FooterMenuItem } from '../base/footer.service';

/**
 * The footer component
 ```html
   <!-- basic footer -->
   <moh-footer></moh-footer>

   <!-- footer with inputs -->
   <moh-footer [miniContactState]="true"></moh-footer>
  ```
 * <example-url>../screenshots/components/v2/footer.png</example-url>
 */
@Component({
  selector: 'moh-footer',
  templateUrl: './footer.v2.component.html',
  styleUrls: ['./footer.v2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterV2Component extends FooterBase implements OnInit, OnDestroy {

  /**
  * Whether to show mini footer
  */
  @Input() miniContactState: boolean = false;
  /**
  * icon name for contact us
  */
  @Input() miniContactIcon?: string = "contact_us";
  /**
  * text to show under icon
  */
  @Input() miniContactTextKey?: string = 'contactUsMenu';
  /**
  * link to contact us form/mail
  */
  @Input() miniContactLinkKey?: string = "miniContactLink";


  networks:  (FooterMenuItem & {titleValue?:Observable<string>})[];
  copyrightTextValue: Observable<string>;
  contactUsV2TextValue: Observable<string>;
  searchUsTextValue: Observable<string>;
  miniContactUsTextValue: Observable<string>;
  externalSiteTextValue: Observable<string>;
  miniContactLinkValue: Observable<string>;
  subscriptions: Array<Subscription> = [];

  constructor(protected injector: Injector, protected cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptions.push(this.footerService.getFooterV2Items().subscribe(menuItems => {
      this.menuLinks = menuItems.menuItemsArray;
      this.genaralMenuLinks1 = menuItems.menuItemLinks1;
      this.genaralMenuLinks2 = menuItems.menuItemLinks2;
      this.networks = menuItems.networks;

      this.menuLinks.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.genaralMenuLinks1.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.genaralMenuLinks2.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.networks.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.cdRef.detectChanges();
    }));
    this.copyrightTextValue = this.getLabelText('copyright');
    this.contactUsV2TextValue = this.getLabelText('contactUsV2');
    this.searchUsTextValue = this.getLabelText('searchUs');
    this.footerLinksAriaLabelValue = this.getLabelText('footerLinksAriaLabel');
    this.miniContactUsTextValue = this.getLabelText(this.miniContactTextKey);
    this.externalSiteTextValue = this.getLabelText('externalSiteLabel');
    this.miniContactLinkValue = this.getLabelText(this.miniContactLinkKey);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}

