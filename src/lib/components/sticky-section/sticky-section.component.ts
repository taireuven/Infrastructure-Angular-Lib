import { Component, AfterViewInit, OnDestroy,HostListener,HostBinding, Input, ElementRef, ViewChild, ViewEncapsulation, Renderer2, OnChanges, SimpleChanges, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { animationFrame } from 'rxjs/scheduler/animationFrame';
import { filter, map, share, startWith, takeUntil, throttleTime } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { MediaObserver } from '@angular/flex-layout';
import { StickySectionService } from './sticky-section.service';
/**
 * The Sticky Component
 *
 * This component does two things:
 *
 * 1. Give this element position:fixed; (By default, it will only get position:fixed after being scrolled past,
 * but this is configurable via the "alwaysSticky" @Input.)
 *
 * 2. Prevent elements that have position:fixed from this component from overlapping each other. If two elements both are using this component,
 * one will display underneath the second.
 *
 * Notes:
 * 1. If you want to style the element with CSS when it is sticky, use ".moh-sticky-active"
 *
 * 2.In order for this to correctly calculate height, two things must occur:
 * a. All items with <img>s must use both "width" and "height" attributes.
 * b. Items should not change their height during or after ngAfterViewInit. If there is no other choice,
 *    and you encounter problems, running "forceRecalculate()" will fix the height.
 *
 *
 *
 * ### Usage:
 *  ```typescript
  <moh-sticky-section [enabled]="this.isEnabled" [mobileHideOnScroll]="true" [fullscreen]="true">
    <div class="itemHeader">
       My content
    </div>
  </moh-sticky-section>
  ```
 * ```css
  CSS:
  .moh-sticky-active .itemHeader{
    background-color:red;
  }
  ```
 */
@Component({
  selector: 'moh-sticky-section',
  templateUrl: './sticky-section.component.html',
  styleUrls: ['./sticky-section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class StickySectionComponent implements AfterViewInit, OnDestroy, OnChanges  {

  /**
  * Enable or disable the sticky.
  */
  @Input() enabled?: boolean = true;
  /**
  * Determines how to sort(orderBy) all the component.
  * For example, if you want your element to display above the header, simply add
  * [order]="-5"
  */
  @Input() order?: number = 0;
  /**
  * Hide this element when scrolling down in mobile.
  * This is a UX feature, useful for not taking up most of the screen in
  * mobile except when we need to see the item.
  */
  @Input() mobileHideOnScroll?: boolean = true;
  /**
  * Always display the element as sticky, regardless of where the screen is scrolled to.
  */
  @Input() alwaysSticky?: boolean = false;
  /**
  * Determines whether the header should put its contents into a fxFlex="72%" fxFlex.xs="88%"
  * container while the sticky is active. This is useful because the CSS "position:fixed;"
  * causes elements to grow to the size of the screen, ignoring its original maximum width.
  */
  @Input() fullscreen?: boolean = true;
  /**
  * Enables the built-in keyframe animations.
  */
  @Input() showAnimation?: boolean = true;
  /**
  * Force re-calculation of content more often.
  *
  * This is useful if the inner content changes height occasionally, or if
  * there are images that don't have height and width attributes, but this
  * can be set to TRUE for a performance improvement.
  */
  @Input() disableImageChecking?: boolean = false;

  /*ViewEncapsulation.None and HostBinding allows us to use .moh-sticky-active in
   other elements without breaking encapsulation there.*/
  @HostBinding('class.moh-sticky-active') isSticky = false;


  @ViewChild('spacer', {static: true}) spacerElement: ElementRef;
  @ViewChild('wrapper', {static: true}) stickyElement: ElementRef;
  private scroll$ = new Subject<number>();
  private scrollThrottled$: Observable<number>;
  private resize$ = new Subject<void>();
  private resizeThrottled$: Observable<void>;
  private settingsChange$ = new Subject<void>();
  private settingsChangeThrottled$: Observable<void>;
  private extraordinaryChange$ = new BehaviorSubject<any>(undefined);
  private status$: Observable<boolean>;
  private componentDestroyed = new Subject<void>();
  private originalElementOffsetY: number;
  private previousUpperScreenEdge: number = 0;
  private isMobile: boolean;
  width:number;

  constructor(private elementRef: ElementRef, private mediaObserver:MediaObserver, public stickyService: StickySectionService,  private renderer: Renderer2, private cdRef:ChangeDetectorRef) {

    /**
     * Throttle the scroll to animation frame (around 16.67ms) */
    this.scrollThrottled$ = this.scroll$
    .pipe(
      throttleTime(0, animationFrame),
      startWith(0),
      share()
    );

    this.settingsChangeThrottled$ = this.settingsChange$
    .pipe(
      throttleTime(0, animationFrame),
      startWith(null),
      share()
    );
    /**
     * Throttle the resize to animation frame (around 16.67ms) */
    this.resizeThrottled$ = this.resize$
    .pipe(
      throttleTime(0, animationFrame),
      // emit once since we are currently using combineLatest
      startWith(null),
      share()
    );


    this.status$ = combineLatest(
      this.scrollThrottled$,
      this.extraordinaryChange$,
      this.resizeThrottled$,
      this.settingsChangeThrottled$
    ).pipe(
      map(([pageYOffset]) => this.determineStatus(pageYOffset)),
      share(),
    );

    // Subscribe to Mobile change event, so we change trigger mohStickymobileHideOnScroll when we detect that
    // the device is mobile.
    this.mediaObserver.media$.subscribe((event) => {
      this.isMobile = (event.mqAlias === "sm" || event.mqAlias === "xs");
    });
  }

  ngAfterViewInit(): void {
    this.originalElementOffsetY = this.determineElementOffsets();
    this.width = this.spacerElement.nativeElement.offsetWidth;
    this.stickyService.addItem({
      elementRef: this.stickyElement,
      active: false,
      order: this.order,
      height: 0
    });
    setTimeout(() => {
      this.status$.pipe(takeUntil(this.componentDestroyed)).subscribe((status) =>
        this.setStickyStatus(status)
      );
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.settingsChange$.next(null);
  }
  ngOnDestroy(): void {
    // Remove this element from the array when we get deleted.
    this.componentDestroyed.next();
    this.stickyService.removeItem(this.stickyElement);
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.reinitStartingValues().then(() => {
      this.resize$.next();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event): void {
    const upperScreenEdgeAt = (event.target as HTMLElement).scrollTop || window.pageYOffset;
    this.scroll$.next(upperScreenEdgeAt);
    this.previousUpperScreenEdge = upperScreenEdgeAt;
  }
  /**
   * This is a public method that can be used to force recalculation, if necessary.
   * In order to use the public function forceRecalculate, below is some sample code:
   *
   * @ViewChild('stickyElement') stickyElement: StickySectionComponent;
   *
   * myFunction() {
   *   this.stickyElement.forceRecalculate();
   * }
   * */
  public forceRecalculate(): void {
    // Make sure to be in the next tick by using timeout
    this.reinitStartingValues().then(() => {
        this.extraordinaryChange$.next(undefined);
    });
  }


  private determineStatus(pageYOffset: number) {
    if (!this.enabled){
      return false;
    }
    // We refresh the correct offset value if it's safe to do so. If we try to refresh while sticky,
    if (!this.disableImageChecking && this.isSticky === false){
      this.originalElementOffsetY = this.determineElementOffsets();
    }

    // We enable sticky if the user has scrolled past our element that should be sticky.
    // let sticky = enabled && pageYOffset >= this.originalElementOffsetY;
    let sticky = pageYOffset + this.stickyService.getPreviousItemsOffset(this.stickyElement) >= this.originalElementOffsetY;

    //We enable sticky if @Input "Always Fixed" is set.
    if (this.alwaysSticky){
      sticky = true;
    }

    // We disable sticky if
    // a. @Input "Hide on Mobile Scroll" is true,
    // b. Mobile is currently active,
    // c. User has scrolled up.
    if (this.mobileHideOnScroll && this.isMobile && pageYOffset > this.previousUpperScreenEdge){
      sticky = false;
    }
    return sticky;
  }

  private setStickyStatus(status: boolean): void {
    if (status !== this.isSticky) { // If status hasn't changed, then skip this part. We only need to update offsets.
      if (status) {
        this.addSticky();
      } else {
        this.removeSticky();
      }
      this.stickyService.setActive(this.stickyElement, status);
      this.isSticky = status;
      this.cdRef.markForCheck();
    }
    // After setting isSticky, we always update offsets, even if no other changes are necessary.
    // We do this because it's possible that another sticky element has been added or subtracted.
    this.updateTopOffsets(status);
  }

  private removeSticky(): void {
    this.stickyElement.nativeElement.style.top = '';
    this.spacerElement.nativeElement.style.height = '';
  }
  private addSticky(): void {
    const height = this.stickyElement.nativeElement.getBoundingClientRect().height;
    this.width = this.spacerElement.nativeElement.offsetWidth;
    this.stickyService.setNewHeight(this.stickyElement, height);
    if (!this.spacerElement.nativeElement.style.height) {
      this.spacerElement.nativeElement.style.height = `${height}px`;
    }
  }
  private updateTopOffsets(status: boolean){
    if (status){
      let offsetTop = this.stickyService.getPreviousItemsOffset(this.stickyElement);
        this.stickyElement.nativeElement.style.top = offsetTop + 'px';
      }
    }
  /**
   * Recalculate starting values. In order to do this, we must first disable sticky,
   * check the values, then re-enable it if needed.
   * The whole reason we run this function is to reset this.originalElementOffsetY
   */
  private reinitStartingValues(): Promise<void>{
    return new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => {
        Promise.resolve().then(() => {
          const currentStickyStatus = this.isSticky;
          if (currentStickyStatus){
            // We force removal of the class after requestAnimationFrame
            // and waiting until the next tick, then we check the style.
            this.renderer.removeClass(this.elementRef.nativeElement, 'moh-sticky-active');
          }

          // After sticky has been turned off,
          // we recalculate values then turn it back on, if necessary.
          this.spacerElement.nativeElement.style.height = '';
          this.originalElementOffsetY = this.determineElementOffsets();
          if (currentStickyStatus){
            const height = this.stickyElement.nativeElement.getBoundingClientRect().height;
            this.spacerElement.nativeElement.style.height = `${height}px`;
            this.renderer.addClass(this.elementRef.nativeElement,'moh-sticky-active');
          }
          this.isSticky = undefined;
          resolve();
        });
      });
    });
  }

  /**
  * Gets the offset for element. We use this method instead of simply getBoundingRect
  * due to bugs in iOS. */
  private determineElementOffsets() {
    let top = 0;
    let element = this.stickyElement.nativeElement;
    const height = this.stickyElement.nativeElement.getBoundingClientRect().height;

    // Loop through the DOM tree
    // and add it's parent's offset to get page offset
    do {
      top += element.offsetTop || 0;
      element = element.offsetParent;
    } while (element);

    top += height;
    return top;
  }
}
