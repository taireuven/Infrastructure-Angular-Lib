import { Component, OnInit, Injector, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { IMenuItem } from '../../../../../models/IMenuItem';
import { Language } from '../../../../../models/language';
import { UmbracoDataService } from '../../../../../services/data/umbraco-data.service';
import { MohTranslateService } from '../../../../../services/translate/moh-translate.service';
import { LabelBase } from '../../../../base/label-base';

/**
 * @ignore
 */
@Component({
  selector: 'moh-menu-item-change-language',
  templateUrl: './menu-item-change-language.component.html',
  styleUrls: ['./menu-item-change-language.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(90deg)'})),
      state('expanded', style({transform: 'rotate(0deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuItemChangeLanguageComponent extends LabelBase implements OnInit, OnDestroy{
    /**
   * The language code will be the selected value,
   *
   * otherwise the selected value will be [MohTranslateService.currentLang]{@link MohTranslateService#currentLang}
   */
  @Input() currentLang?: string;// = this.mohTranslateService.currentLang;
  /**
   * The applications names of the languages list,
   *
   * otherwise show the default languages list.
   */
  @Input() languagesListApps?: string;

  /**
   * List of languages to show. (Useful when not using Umbraco)
   */
  @Input() languagesList?: Language[];

  itemList: IMenuItem[];
  expanded: boolean;
  public activeLanguage: Language;
  constructor(injector: Injector, private umbracoDataService: UmbracoDataService,  private mohTranslateService: MohTranslateService) {
    super(injector);
  }
  ngOnInit(){
    this.currentLang = this.currentLang || this.mohTranslateService.currentLang; 

    if (this.languagesList != null) {
      this.initLanguages(this.languagesList);
    }
    else {
    this.subscriptions.push(this.umbracoDataService.getLanguages(this.languagesListApps).subscribe((data: any) => {
      this.initLanguages(data);
      }));
    }
  }

  initLanguages(data: any) {
    this.activeLanguage = data.find(lang => { return lang.code === this.currentLang; });

    // Convert from Language[] to IMenuItem[]
    this.itemList = data.map((lang) => {
      return {
        url: '',
        title: lang.displayName,
        titleKey: lang.code,
        triggerFunction: () => { this.changeToNewLanguage(lang); }
      };
    });
  }

  openMenu(){
    this.expanded = !this.expanded;
  }
  changeToNewLanguage(val: Language){
    this.activeLanguage = val;
    this.mohTranslateService.setSelectedLang(val);
    this.mohTranslateService.use(val.code);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
