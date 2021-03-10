import { Component, Injector, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { HeaderBase } from '../base/header.base';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../services/config/config.service';
import { IMenuItem } from '../../../models/IMenuItem';
import { NavService } from '../../menu/navbar/base/nav.service';
import { MediaObserver } from '@angular/flex-layout';
import { Language } from '../../../models/language';

/**
 * The header component
 *
 * ### Usage
  ```html
   <!-- basic header -->
   <moh-header></moh-header>

   <!-- header without selectLanguage component -->
   <moh-header showSelectLanguage="false"></moh-header>

   <!-- header with selectLanguage component and custom @Inputs -->
   <moh-header currentLang="en" languagesListApps="appCode1,appCode2" labelTextKey="selectLanguage"></moh-header>
    <!-- header with button and site name-->
   <moh-header [showButtonInHeader]="true" [headerButtonLabelKey] ="'headerButtonLabelKey'" [showSelectLanguage]="false" [mainSiteKey] = "'mainSiteKey'" [currentSiteKey]="'currentSiteKey'"></moh-header>
  ```
 * <example-url>../screenshots/components/v2/header.png</example-url>
 * <example-url>../screenshots/components/v2/header-with-select.png</example-url>
*/
@Component({
  selector: 'moh-header',
  templateUrl: './header.v2.component.html',
  styleUrls: ['./header.v2.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderV2Component extends HeaderBase implements OnChanges {

  /**
   * Text key to show in the header- name of the main/parent site
   */
  @Input() mainSiteKey?: string = '';
  /**
 * Text key to show in the header- name of the current site
 */
  @Input() currentSiteKey?: string = '';
  /**
  * Text key to show in the header- name of the current page
  * 
  * (This should be the same title displayed in the banner.)
  */
  @Input() pageTitleKey: string;
  /**
 * Whether to show the button in header.
 */
  @Input() showButtonInHeader?: boolean = false;
  /**
  * The external path to navigate when clicking the button in header.
  */
  @Input() externalPath?: string=null;
  /**
   * The key of the text on button.
   */
  @Input() headerButtonLabelKey?: string = '';
  /**
   * Whether click on header button open in new tab
   */
  @Input() headerButtonOpenNewTab?: boolean = true;
  /**
  * The name of the user institution.
  */
  @Input() institutionName?: string;
  /**
  * Whether to show menu in header (for mobile)
  */
  @Input() showMenuToggleButton: boolean = false;
  /**
  * Whether the header should be sticky (scroll with the screen).
  */
  @Input() stickyMode?: boolean = true;
  /**
  * The menu Id from db for menu items.
  */
  @Input() navMenuId?: number;
  /**
   * The menu that should be displayed inside the hamburger in mobile. See the Navbar component for more information.
   */
  @Input() menuItems?: IMenuItem[]  = [];
  /**
   * Specifies how far down the page to scroll before displaying the pageTitle (In pixels).
   */
  @Input() pageTitleScrollAmount?: number = 165;
  /**
   * Function that maps an option's control value to its display value in the trigger of [SelectLanguageComponent]{@link SelectLanguageComponent#labelTextKey}.
   */
  @Input() languageDisplayWith: ((value: Language) => string) | null;

  mainSiteValue: Observable<string>;
  currentSiteValue: Observable<string>;
  pageTitleValue$: Observable<string>;
  headerButtonValue$: Observable<string>;
  isMobile: boolean;
  displayPageTitle: boolean;

  constructor(injector: Injector, private configService: ConfigService, public mediaObserver: MediaObserver, public navService:NavService) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    // Subscribe to Mobile change event, so we change trigger mohStickymobileHideOnScroll when we detect that 
    // the device is mobile.
    this.mediaObserver.media$.subscribe((event) => {
      this.isMobile = (event.mqAlias === "sm" || event.mqAlias === "xs");
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mainSiteValue = this.isInputChange(changes.mainSiteKey) ? this.getLabelText(this.mainSiteKey) : this.mainSiteValue;
    this.currentSiteValue = this.isInputChange(changes.currentSiteKey) ? this.getLabelText(this.currentSiteKey) : this.currentSiteValue;
    this.headerButtonValue$ = this.isInputChange(changes.headerButtonLabelKey) ? this.getLabelText(this.headerButtonLabelKey) : this.headerButtonValue$;
    this.pageTitleValue$ = this.isInputChange(changes.pageTitleKey) ? this.getLabelText(this.pageTitleKey) : this.pageTitleValue$;
  }

  private isInputChange(inputChanges) {
    return (inputChanges && inputChanges.currentValue != inputChanges.previousValue);
  }

  redirectToExternalPath() {
    if (this.headerButtonOpenNewTab)
      window.open(this.externalPath, '_blank');
    else
      window.location.href = this.externalPath;
  }

  toggleButton() {
    this.navService.toggleNav();
  }
  redirect(){
    if(this.externalPath)
      this.redirectToExternalPath();
    else
      this.redirectTolocalPath();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event): void {
    /*
    * The PageTitle field should display only after a certain number of pixels have been
    * scrolled past, specified by the @Input pageTitleScrollAmount:number. 
    */ 
    const upperScreenEdgeAt = (event.target as HTMLElement).scrollTop || window.pageYOffset;
    this.displayPageTitle = (upperScreenEdgeAt > this.pageTitleScrollAmount);
  }
}
