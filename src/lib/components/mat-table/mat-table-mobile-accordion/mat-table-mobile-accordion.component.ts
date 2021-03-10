import { Component, OnInit, ElementRef, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { MatCell } from '@angular/material';
import { CdkColumnDef } from '@angular/cdk/table';

/**
* This component is designed to add an additional mat-cell to your table, that acts like an accordion.
* To use this component, you'll also require the directive mat-row[mohIsAccordion] (See Usage)
* You can choose which screen sizes the accordion is enabled in by modifying the mat-row's directive [mohIsAccordion].
*
* Available resolutions are:
* @Input() mohIsAccordion: Array<("xs"|"sm"|"md"|"lg"|"xl"|"all")> = ["xs","sm"];
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

 <mat-row [mohIsAccordion]="['xs','sm']" *matRowDef="let row; columns: displayColumns.concat(['collapse']);"></mat-row>
```


* If you want to use this in mobile, you'll probably want to only show some columns in mobile.
* You can do this via fxHide.lt-md, or simply @media (max-width:600px){display:none;} For example:
*
*
```html
<!--id-->
<ng-container matColumnDef="id">
    <mat-header-cell *matHeaderCellDef fxHide.lt-md>
      ..content..
    </mat-header-cell>
    <mat-cell *matCellDef="let row;" fxHide.lt-md>
      ..content..
    </mat-cell>
</ng-container>
```
*/
@Component({
  selector: 'moh-mat-table-mobile-accordion',
  templateUrl: './mat-table-mobile-accordion.component.html',
  styleUrls: ['./mat-table-mobile-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatTableMobileAccordionComponent extends MatCell implements AfterViewInit  {
  @ViewChild('arrow', {static: true}) arrow: ElementRef;
  arrowOffset: number;

  constructor(columnDef: CdkColumnDef, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.arrowOffset = this.arrow.nativeElement.offsetTop;
    },0);
  }

}
