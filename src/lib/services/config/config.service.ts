import { Injectable } from '@angular/core';
import { Configuration } from './config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private config: any;
  private baseConfig: Configuration;
  constructor(private http:HttpClient) { }

  load(url: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(url).subscribe((config: any) => {
        this.config = config;

        let parseResult = false

        if (config['moh-package']) {
          this.baseConfig = new Configuration();
          parseResult = this.baseConfig.tryParse(config['moh-package']);
        } 
        if (!parseResult) {
          console.log('Warning: Missing configuration. Not found the expected "moh-package" section in config file');
        }
           
        resolve();
      });
    });
  }

  get configuration(): any {
    return this.config;
  }

  get baseConfiguration(): Configuration {
    return this.baseConfig;
  }
}
