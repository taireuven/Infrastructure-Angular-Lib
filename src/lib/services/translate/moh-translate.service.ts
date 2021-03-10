import { Injectable, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LangChangeEvent } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Language } from '../../models/language';
import { Direction } from '../../models/direction';

export interface MohLangChangeEvent {
  lang: Language;
  translations: any;
}

@Injectable({
  providedIn: 'root',
})
export class MohTranslateService {

  private titleKey;
  private _direction: Direction;
  private selectedLang: Language;

  set direction(value) {
    this._direction = value;
  }

  get direction(): Direction {
      return this.selectedLang? this.selectedLang.direction : this._direction;
  }

  /**
   * An EventEmitter to listen to lang change events
   */
  onLangChange: EventEmitter<MohLangChangeEvent> = new EventEmitter<MohLangChangeEvent>();

  constructor(protected translateService: TranslateService, private titleService: Title) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {

      this.onLangChange.emit({
        lang: this.selectedLang || { code: event.lang, direction: this.direction, displayName: '' },
        translations: event.translations
      });
      this.changeTitle();
    });
  }

  /**
   * The lang currently used
   */
  get currentLang(): string {
    return this.translateService.currentLang;
  }

  /**
  * A list of translations of the current language.
  */
  get translations(): any {
    return this.translateService.translations ?
      this.translateService.translations[this.currentLang] :
      this.translateService.translations;
  }

  /**
   * Gets an object of translations for a given language with the current loader and passes it through the compiler.
   * @param lang
   */
  getTranslation(lang:string):Observable<any> {
    return this.translateService.getTranslation(lang);
  }

  /**
   * Gets the translated value of a key or the key if the value was not found
   */
  getLabelText(key: string, params?: any): Observable<string> {
    return this.translateService
      .get(key, params).pipe(map((res: string) => {
        return res;
      }));
  }

  /**
   * Gets the instant translated value of a key
   */
  getInstantLabelText(key: string, params?: any): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Sets the default language to use as a fallback
   */
  setDefaultLang(lang: string) {
    this.translateService.setDefaultLang(lang);
  }

  /**
   * Changes the lang currently used
   */
  use(lang: string): Observable<any> {
    return this.translateService.use(lang);
  }

  setSelectedLang(lang: Language) {
    this.selectedLang = lang;
  }

  setTitleKey(titleKey: string) {
    this.titleKey = titleKey;
    this.changeTitle();
  }

  changeTitle = (): void => {

    if (this.titleKey) {
      let keyWithDocType = this.titleKey.split('.').length == 1 ? 'labels.' + this.titleKey : this.titleKey;

      this.getLabelText(keyWithDocType).subscribe(text => {
        this.titleService.setTitle(keyWithDocType == text ? this.titleKey : text);
      });
    }
  };
}

