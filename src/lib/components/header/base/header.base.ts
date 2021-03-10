import { OnInit, Injector, Input, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LabelBase } from '../../base/label-base';
import { MohTranslateService } from '../../../services/translate/moh-translate.service';
import { Direction } from '../../../models/direction';
import { Language } from '../../../models/language';

export class HeaderBase extends LabelBase implements OnInit {
  private mohTranslateService: MohTranslateService;
  protected router: Router;

  /**
   * Whether to show the select language component
   */
  @Input() showSelectLanguage: boolean = true;
  /**
   * The language code will be the selected value of [SelectLanguageComponent]{@link SelectLanguageComponent#currentLang}.
   */
  @Input() currentLang?: string;
  /**
  * The applications names of the languages list of [SelectLanguageComponent]{@link SelectLanguageComponent#languagesListApps}.
  */
  @Input() languagesListApps?: string;
  /**
   * List of languages to show in [SelectLanguageComponent]{@link SelectLanguageComponent#languagesListApps}.
   */
  @Input() languagesList?: Language[];
  /**
   * The key of the label text of [SelectLanguageComponent]{@link SelectLanguageComponent#labelTextKey}.
   */
  @Input() selectLanguageLabelKey?: string;

  /**
   * Whether to show the Back to home page button.
   */
  @Input() showBackToHomeButton?: boolean = true;
  /**
   * The route path to navigate when clicking the Back to home page button.
   */
  @Input() localPath?: string = '/';


  mainLogoAltValue: Observable<string>;
  kolHabriutAriaLabelValue: Observable<string>;

  constructor(protected injector: Injector) {
    super(injector);
    this.mohTranslateService = injector.get(MohTranslateService);
    this.router = injector.get(Router);
  }

  ngOnInit() {
    this.mainLogoAltValue = this.getLabelText('mainLogoAlt');
    this.kolHabriutAriaLabelValue = this.getLabelText('kolHabriutAriaLabel');
  }

  get isLtr(): boolean { return this.mohTranslateService.direction == Direction.LTR; }

  getHeaderItems() {
    return [{}, {}]
  }

  redirectTolocalPath() {
    this.router.navigateByUrl(this.localPath);
  }
}
