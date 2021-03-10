import { Component, OnInit, Input, ChangeDetectorRef, ViewChild,ViewEncapsulation, OnChanges } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

/**
 * The Mat table paginator component is used to manage the pagination of the table in client side
 * 
 * 
 *
 * 
 * ### Usage 
 * 
  ```html
  
   <moh-mat-table-paginator [pageSize]="itemsPerPage" [length]="dataSource.data?.length" [buttonsMenuSize]="pageButtonsSize" [customStyle]="true">
   </moh-mat-table-paginator>
  ```
  
  ```typescript
    itemsPerPage: number = 3;
    pageButtonsSize: number =2;
    @ViewChild(MatTablePaginatorComponent, { static: true }) customPaginator: MatTablePaginatorComponent;
  
     ngOnInit() {
        if (this.customPaginator && this.customPaginator.paginator)
             this.dataSource.paginator = this.customPaginator.paginator;
     }
   ```      
*/
@Component({
  selector: 'moh-mat-table-paginator',
  templateUrl: './mat-table-paginator.component.html',
  styleUrls: ['./mat-table-paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MatTablePaginatorComponent  implements OnInit, OnChanges {
  private _length: number;
  private _pageSize: number;
  private _buttonsMenuSize: number=5;
  private _customStyle:boolean;
  firstIndexPageBtn: number = 0;
  lastIndexPageBtn: number = 0;
  color:string;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

/**
 * length input : number
 * total count of data items.
 */
  @Input()
  set length(length: number) {
    this._length = length;
  }
  get length(): number {
    return this._length;
  }
 
  /**
 * pageSize input : number
 *  count of items in page.
 */
  @Input()
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
  }
  get pageSize(): number {
    return this._pageSize;
  }


  /**
 * buttonsMenuSize input : number
 * length of the menu buttons (which will be shown)
 */
  @Input()
  set buttonsMenuSize(buttonsMenuSize: number) {
    this._buttonsMenuSize = buttonsMenuSize;
  }
  get buttonsMenuSize(): number {
    return this._buttonsMenuSize;
  }
 
  /**
 * custom style input : boolean
 */
@Input()
set customStyle(customStyle: boolean) {
  this._customStyle = customStyle;
}
get customStyle(): boolean {
  return this._customStyle;
}

  ngOnInit() {}
  ngOnChanges(){
    if (this.customStyle && this.customStyle === true){
      this.color = this.getBackgroundColor();
    }
  }
 
  /**
   * update the data of the page according to the index (pageNumber)
   */
  updatePageData(pageNumber: number) {
    this.paginator.pageIndex = pageNumber;
    this.paginator.page.next({
      pageIndex: pageNumber,
      pageSize: this.pageSize,
      length: this.length
    });
    this.recalculatePageButtons();
    
   
  }


  /** 
   * get the menu page buttons 
   *  */
  getPageButtons(firstIndexPageBtn: number) {
    var count;
    let result: number[] = [];
    var lastPageIndex = 0;

    if (this.paginator)
      lastPageIndex = this.paginator.getNumberOfPages();


    if ((firstIndexPageBtn + this.buttonsMenuSize) < lastPageIndex + 1) {
      count = firstIndexPageBtn + this.buttonsMenuSize;
    }
    else {
      count = lastPageIndex;
    }

    for (var i = firstIndexPageBtn; i < count; i++) {
      result.push(i);
    }
    this.firstIndexPageBtn = firstIndexPageBtn;
    this.lastIndexPageBtn = count - 1;

    return result;
  }



  // calucate the color
  getBackgroundColor() {
    let pagesCount = Math.ceil(this.length / this.pageSize);
    let countInLastPage = this.length -((pagesCount - 1)* this.pageSize);
    if (this.paginator.pageIndex < pagesCount - 1) {
      if (this.pageSize % 2 == 0)
        return '#fff';
      else return '#f0f4f7';

    }
    else { // last page
      if (countInLastPage % 2 == 0) {
        return '#fff';
      }
      else return '#f0f4f7';
    } 
  }

  goToNext(){
    this.paginator.nextPage();
    this.recalculatePageButtons();
  }

  goToPrev(){
    this.paginator.previousPage();
    this.recalculatePageButtons();
  }

  recalculatePageButtons(){// Here we rewrite firstIndexPageBtn so the current page is in the center.
    let currentPageIndex: number = this.paginator.pageIndex;
    let count: number = this.lastIndexPageBtn - this.firstIndexPageBtn;
    if (!count){
      return;
    } 
    let targetIndex = currentPageIndex - Math.floor(count / 2); //Center it.

    if (targetIndex < 0){
      targetIndex = 0;
    }
    if (targetIndex > (this.paginator.getNumberOfPages()-1) - count ){
      targetIndex = (this.paginator.getNumberOfPages()-1) - count;
    }
    this.firstIndexPageBtn = targetIndex;
    
  }
}
