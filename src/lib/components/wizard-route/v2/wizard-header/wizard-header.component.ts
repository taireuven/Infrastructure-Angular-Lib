import { Component, ViewChild, Host, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MohTranslateService, MohLangChangeEvent } from '../../../../services/translate/moh-translate.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { SwiperConfigInterface, SwiperComponent } from 'ngx-swiper-wrapper';
import { WizardRouteV2Component } from '../wizard-route.v2.component';
import { Subscription } from 'rxjs';

/**
 * @ignore
 */
@Component({
  selector: 'moh-wizard-header',
  templateUrl: './wizard-header.component.html',
  styleUrls: ['./wizard-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WizardHeaderComponent implements AfterViewInit, OnDestroy{

  constructor(@Host() public wizardRoute: WizardRouteV2Component,protected mediaObserver: MediaObserver, protected mohTranslateService: MohTranslateService) {

    this.swiperConfig = {
      // Documentation: https://swiperjs.com/api/
      // Source: https://www.npmjs.com/package/ngx-swiper-wrapper
      // slidesPerView: 6.5,
      slidesPerView: 'auto',
      // centerInsufficientSlides: true,
      watchOverflow: true,
      loop: false,
      slidesPerColumnFill:'row',
      grabCursor:true,
      touchStartPreventDefault: true,
      allowTouchMove: true,
      // touchReleaseOnEdges: true

    };
   }

  @ViewChild('swiper',{static: false}) public swiper: SwiperComponent;
  private subscriptions: Array<Subscription> = [];
  fxMobile: boolean;
  leftCssShadow: boolean;
  rightCssShadow: boolean;
  swiperConfig: SwiperConfigInterface;

  ngAfterViewInit() {

    // This fixes the direction if we change the language without refreshing the page.
    this.subscriptions.push(this.mohTranslateService.onLangChange.subscribe((event: MohLangChangeEvent) => {
      if (event.lang.direction) {
        const swiper = (<any>this.swiper.directiveRef).instance;
        swiper.rtl =  event.lang.direction === 'rtl';
        swiper.rtlTranslate = event.lang.direction === 'rtl';
        this.selectActiveSlide();
      }
    }));

    // This tells us whether flexLayout thinks we're mobile.
    // We use this to disable the slider in mobile.
    this.subscriptions.push(this.mediaObserver.media$.subscribe((value:MediaChange) => {
      setTimeout(() => { // Force re-trigger of change detection.
        this.fxMobile = (value.mqAlias === "sm" || value.mqAlias === "xs");
        this.swiper.config.allowTouchMove = !this.fxMobile || this.wizardRoute.headerStyleTabs;
      },0);
    }));

    //Set carousel to scroll to active slide.
    this.selectActiveSlide();
    this.wizardRoute.onStepChanged.subscribe(() => {
      this.selectActiveSlide();
    });
  }
  displayShadow(activeIndex?: number){

    if (!this.swiper){
      return;
    }
    //Display shadow based upon whether
    //a. The first/last slide is visible.
    //b. First slide is RTL or not.
    const rtl = (<any>this.swiper.directiveRef).instance.rtl;
    if (rtl){
      this.leftCssShadow = !(this.swiper.isAtLast);
      this.rightCssShadow = !(this.swiper.isAtFirst);
    } else {
      this.rightCssShadow = !(this.swiper.isAtLast);
      this.leftCssShadow = !(this.swiper.isAtFirst);
    }
  }

  selectActiveSlide() {
    // Find the currently active step element.
    setTimeout(() => { // Force re-trigger of change detection.
      // if (this.fxMobile){// Don't trigger any carousel events if we're using mobile.
        // return;
      // }
      let index = this.wizardRoute.getIndexOfActiveStep();
      if (index <= 5){
        index = 0; //Don't slide until we need to, for UX reasons.
      }
      this.swiper.directiveRef.setIndex(index,0,true);
      this.displayShadow(index);
    },0);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
