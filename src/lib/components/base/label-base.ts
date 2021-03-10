import { Input, Injector, OnDestroy } from "@angular/core";
import { MohTranslateService } from "../../services/translate/moh-translate.service";
import { Observable , BehaviorSubject, Subscription } from "rxjs";

const DOC_TYPE: string = 'labels.';

export class LabelBase implements OnDestroy {

  @Input() textKey: string;
  @Input() textParams?: any;
 
  private translateService: MohTranslateService;
  private textValueSubject: BehaviorSubject<string> = new BehaviorSubject('');
  protected subscriptions: Array<Subscription> = [];

  get textValue(): Observable<string> {
    this.nextTextValue(this.textValueSubject,this.textKey,this.textParams)

    return this.textValueSubject.asObservable();
  }

  constructor(protected injector: Injector) {
    this.translateService = injector.get(MohTranslateService);

    this.subscriptions.push(this.translateService.onLangChange.subscribe(() => {
      this.nextTextValue(this.textValueSubject, this.textKey, this.textParams)
    }));
  }

  getLabelText(textKey:string, textParams?: any) {
    let labelSubject: BehaviorSubject<string> = new BehaviorSubject('');

    this.nextTextValue(labelSubject, textKey, textParams);

    this.subscriptions.push(this.translateService.onLangChange.subscribe(() => {
      this.nextTextValue(labelSubject, textKey, textParams);
    }));

    return labelSubject.asObservable();
  }

  getInstantLabelText(textKey, textParams?: any): string {
    if (textKey) {
      let keyWithDocType = textKey.split('.').length == 1 ? DOC_TYPE + textKey : textKey;
      let value = this.translateService.getInstantLabelText(keyWithDocType, textParams);

      return keyWithDocType == value ? textKey : value
    }
  }

  private nextTextValue(subject, textKey, textParams) {
    if (textKey) {
      let keyWithDocType = textKey.split('.').length == 1 ? DOC_TYPE + textKey : textKey;

      this.subscriptions.push(this.translateService.getLabelText(keyWithDocType, textParams).subscribe(value => {
        subject.next(keyWithDocType == value ? textKey : value);
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
