import { Directive, Input, ElementRef, HostBinding, OnInit, OnDestroy } from '@angular/core';

import { MohTranslateService, MohLangChangeEvent } from '../services/translate/moh-translate.service';
import { Direction } from '../models/direction';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[mohDir]'
})
export class DirDirective implements OnInit, OnDestroy {

  private subscription: Subscription;

  @Input() mohDir: Direction = Direction.RTL;

  constructor(private el: ElementRef, private mohTranslateService: MohTranslateService) { }

  ngOnInit(): void {

    this.mohTranslateService.direction = this.mohDir;

    document.documentElement.dir = this.mohDir;

    this.subscription = this.mohTranslateService.onLangChange.subscribe((event: MohLangChangeEvent) => {
      if (event.lang.direction) {
        document.documentElement.dir = event.lang.direction;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
