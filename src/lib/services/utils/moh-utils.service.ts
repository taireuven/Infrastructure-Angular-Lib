import { Injectable, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { MohTranslateService } from '../translate/moh-translate.service';
import { ConfigService } from '../config/config.service';
@Injectable()
export class MohUtilsService {

  constructor(private injector: Injector, private config: ConfigService, private translate: MohTranslateService) { }

  public initialize(configFileUrl: string): Promise<any> {
    //return Promise.all([this.config.load(configFile), this.loadTranslations()]);
    return new Promise(resolve => {
      this.config.load(configFileUrl).then(() => {
        /*if (this.config.configuration["moh-package"].useCKEditor) {
          const url = '//cdn.ckeditor.com/4.11.3/full-all/ckeditor.js';
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          document.body.appendChild(script);
        }*/
        this.loadTranslations().then(() => {
          resolve();

        })
      })
    });
  }

  private loadTranslations(): Promise<any> {
    const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    const langToSet = this.config.baseConfiguration.lang;

    return new Promise(resolve => {

      locationInitialized.then(() => {

        this.translate.setDefaultLang(langToSet);

        this.translate.use(langToSet).subscribe(() => {
          //console.info(`Successfully initialized '${langToSet}' language.`);
        }, err => {
          console.error(`Problem with '${langToSet}' language initialization.'`);
          resolve(null);
        }, () => {
          resolve(null);
        });
      });
    });
  }
}
