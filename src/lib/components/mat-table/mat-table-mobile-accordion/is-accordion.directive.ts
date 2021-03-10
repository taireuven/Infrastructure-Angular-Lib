import { Directive, ElementRef, ViewContainerRef, Self, Host, OnInit, Input, HostListener, HostBinding, OnDestroy, Renderer2 } from '@angular/core';
import { MatCell, MatCellDef, MatRow, MatRowDef, MatTableModule } from '@angular/material';
import { Optional } from 'ag-grid-community';
import { CdkRow } from '@angular/cdk/table';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

/**
  * This directive is used together with <moh-mat-table-mobile-accordion> to create an accordion out of mat-table.
  * See the component <moh-mat-table-mobile-accordion> for more information.
  *
  * The parameter is for choosing when the accordion is enabled. Valid values are:
  *  @Input() mohIsAccordion: ("xs"|"sm"|"md"|"lg"|"xl"|"all")[] = ["xs","sm"];
  *
  * ### Usage
  ```html
  <!-- Accordion Cell -->
  <ng-container matColumnDef="collapse">
    <moh-mat-table-mobile-accordion *matCellDef="let row">
      <div><span class="mobile-label">name:</span>{{row.name}}</div>
      <div><span class="mobile-label">email:</span>{{row.email}}</div>
      <div><span class="mobile-label">ID:</span>{{row.id}}</div>
    </moh-mat-table-mobile-accordion>
  </ng-container>

  ....

  <mat-row [mohIsAccordion]="['xs','sm']" *matRowDef="let row; columns: displayColumns;"></mat-row>
  ```

  ```typescript
  this.displayColumns = [.......,'collapse']
  OR
  this.displayColumns.push('collapse');
  ```
*/
@Directive({
  selector: 'mat-row[mohIsAccordion]',
  host: {
    class: 'hasCollapse',
  }
})
export class MatTableHasAccordionDirective implements OnInit, OnDestroy{
  /**
   *  Which fxFlex sizes to enable the collapse on. Default is enabled on ['xs','sm']
   */
  @Input('mohIsAccordion') sizes: Array<("xs"|"sm"|"md"|"lg"|"xl"|"all")> = ["xs","sm"];
  @HostBinding('class.isEnabled') public isEnabled: boolean;
  @HostBinding('class.isCollapsed') public isCollapsed: boolean = false;
  private isMobile$: Subscription;
  constructor(private element: ElementRef, private mediaObserver: MediaObserver, private renderer: Renderer2) {

  }

  ngOnInit(){

    this.isMobile$ = this.mediaObserver.media$.subscribe((value:MediaChange) => {

      // ['xs','sm','md','lg','xl', 'all']
      if (this.sizes){
        this.isEnabled = this.sizes.includes(<any>value.mqAlias) || this.sizes.includes('all');
      }

      if (this.isEnabled){
        this.renderer.setAttribute(this.element.nativeElement, 'tabindex', '0');
        this.renderer.setAttribute(this.element.nativeElement, 'role', 'button');
        this.renderer.setAttribute(this.element.nativeElement, 'aria-expanded', this.isCollapsed.toString());
      } else {
        this.renderer.removeAttribute(this.element.nativeElement, 'tabindex');
        this.renderer.removeAttribute(this.element.nativeElement, 'role');
        this.renderer.removeAttribute(this.element.nativeElement, 'aria-expanded');
      }
    });
  }
  toggleMenu(){
    this.isCollapsed = !this.isCollapsed;
    this.renderer.setAttribute(this.element.nativeElement, 'aria-expanded', this.isCollapsed.toString());
  }
  // Prevent accordion closed if user clicked inside moh-mat-table-mobile-accordion.
  @HostListener('click', ['$event.target']) onClick(target: HTMLElement){
    var accordion = this.element.nativeElement.querySelector("moh-mat-table-mobile-accordion");
    if(!accordion.contains(target)) {
         this.toggleMenu();
    }
  }
  // Prevent accordion closed if user pressed enter on a button inside moh-mat-table-mobile-accordion.
  @HostListener('keydown.enter', ['$event.target']) onEnter(target: HTMLElement){
    if (this.element.nativeElement == document.activeElement){
      this.toggleMenu();
    }
  }

  ngOnDestroy(){
    if (this.isMobile$){
      this.isMobile$.unsubscribe();
    }
  }
}
