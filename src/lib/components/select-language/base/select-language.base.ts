import { OnInit, Input, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

import { MohTranslateService } from '../../../services/translate/moh-translate.service';
import { UmbracoDataService } from '../../../services/data/umbraco-data.service';
import { Language } from '../../../models/language';

export class SelectLanguageBase implements OnInit {

  /**
   * The language code will be the selected value,
   *
   * otherwise the selected value will be [MohTranslateService.currentLang]{@link MohTranslateService#currentLang}
   */
  @Input() currentLang?: string;// = this.mohTranslateService.currentLang;
  /**
   * The applications names of the languages list,
   *
   * otherwise show the defualt languages list.
   */
  @Input() languagesListApps?: string;

  _languagesList: Language[];
  get languagesList(): Language[] {
    return this._languagesList;
  }

  /**
   * List of languages to show. (Useful when not using Umbraco)
   */
  @Input() set languagesList(value: Language[]) {
    this._languagesList = value;
    if (this._languagesList != null) {
      this.initLanguages(this.languagesList);
    }
  }

  /**
   * The key of the label text.
   */
  @Input() labelTextKey?: string = "selectLanguageLabelKey";

  select: FormControl;
  languagesSubject: BehaviorSubject<Language[]> = new BehaviorSubject([]);
  languages: Observable<Language[]> = this.languagesSubject.asObservable();//this.umbracoDataService.getList('language');

  private mohTranslateService: MohTranslateService;
  private umbracoDataService: UmbracoDataService;

  constructor(protected injector: Injector, ) {
    this.mohTranslateService = injector.get(MohTranslateService);
    this.umbracoDataService = injector.get(UmbracoDataService);
  }

  ngOnInit() {
    this.select = new FormControl();//this.currentLang
    this.currentLang = this.currentLang || this.mohTranslateService.currentLang;

    if (!this.languagesList) {
      this.umbracoDataService.getLanguages(this.languagesListApps).subscribe((data: any) => {
        this.initLanguages(data);
      }, error => { this.languagesSubject.error(error) });
    }

    this.select.valueChanges.subscribe(val => {
      if (val) {
        this.changeLanguage(val);
      }
    });
  }

  initLanguages(data: any) {
    this.languagesSubject.next(data);

    let currentLang = data.find((lang) => { return lang.code == this.currentLang });
    if (currentLang) {
      this.select.setValue(currentLang)
    }
  }

  changeLanguage(val: Language) {
    this.mohTranslateService.setSelectedLang(val);

    this.mohTranslateService.use(val.code);

    //document.documentElement.dir = val.direction;
  }
}
