import { Injectable, Inject, ViewChild, EventEmitter } from '@angular/core';
import { MohHttpClient } from '../../moh-angular-lib.module';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { ConfigService } from '../../services/config/config.service';


@Injectable()
export class RecaptchaService {
  
  public afterRecapthchaValidation: EventEmitter<any>;
  public resetRecatcha: EventEmitter<any>;

  constructor(private http: MohHttpClient, private configService: ConfigService) {
    this.afterRecapthchaValidation = new EventEmitter<any>();
    this.resetRecatcha = new EventEmitter<any>();
  }

  recaptchaValidated = (): void => {
    this.afterRecapthchaValidation.emit();
  };

  resetRecatchaControl = (): void => {
    this.resetRecatcha.emit();
  };
}
