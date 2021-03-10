import { OnInit, Injector, Input, Injectable, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

import { LabelBase } from '../../base/label-base';
import { MohTranslateService } from '../../../services/translate/moh-translate.service';
import { Direction } from '../../../models/direction';
import { FooterService, FooterMenuItem } from './footer.service';

export class FooterBase extends LabelBase implements OnInit {
  contactUsTextValue: Observable<string>;
  titleValue: Observable<string>;
  genaralTitleValue: Observable<string>;
  footerLinksAriaLabelValue: Observable<string>;

  get isLtr(): boolean { return this.mohTranslateService.direction == Direction.LTR; }
  private test;

  private mohTranslateService: MohTranslateService;
  menuLinks: (FooterMenuItem & {titleValue?:Observable<string>} )[];
  genaralMenuLinks1: (FooterMenuItem & {titleValue?:Observable<string>} )[];
  genaralMenuLinks2: (FooterMenuItem & {titleValue?:Observable<string>} )[];
  protected footerService: FooterService;

  constructor(protected injector: Injector, protected cdRef: ChangeDetectorRef) {
    super(injector);
    this.footerService = injector.get(FooterService);
    this.mohTranslateService = injector.get(MohTranslateService);
  }

  ngOnInit() {
    this.contactUsTextValue = this.getLabelText('contactUs');
    this.footerLinksAriaLabelValue = this.getLabelText('footerLinksAriaLabel');
  }
}

