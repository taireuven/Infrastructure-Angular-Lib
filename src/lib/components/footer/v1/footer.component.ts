import { Component, ViewEncapsulation, Injector, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { FooterBase } from '../base/footer.base';

/**
 * The footer component
 * ```html
   <!-- basic footer -->
   <moh-footer></moh-footer>
 * ```
 * <example-url>../screenshots/components/v1/footer.png</example-url>
 */
@Component({
  selector: 'moh-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class FooterComponent extends FooterBase implements OnInit {
  /**
  * Whether to show big icons or not
  */
  @Input() showBigIcons: boolean = true;

  constructor(protected injector: Injector, protected cdRef: ChangeDetectorRef) {
    super(injector, cdRef);
  }

  ngOnInit() {
    super.ngOnInit();

    this.footerService.getFooterItems().subscribe(menuItems => {
      this.menuLinks = menuItems.menuItemsArray;
      this.genaralMenuLinks1 = menuItems.menuItemLinks1;
      this.genaralMenuLinks2 = menuItems.menuItemLinks2;

      this.menuLinks.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.genaralMenuLinks1.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.genaralMenuLinks2.forEach(x => {
        x['titleValue'] = this.getLabelText(x.TitleKey);
      });
      this.cdRef.detectChanges();
    });
  }
}

