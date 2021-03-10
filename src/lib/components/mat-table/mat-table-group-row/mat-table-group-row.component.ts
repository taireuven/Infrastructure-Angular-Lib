import { Component, OnInit, Injector, Input} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Group, MohMatTableService } from '../moh-mat-table.service';

/**
 * The Mat table group row  component is used to group the mat table rows according to specific column .
 * The order of the columns name in groupByColumns array is important to determine the hierarchy of the grouping
 * To use this component you must use the moh mat table service and initialize the data in your ts code
 *
 * 
 * ### Usage 
 * 
  ```html
  
    <!-- Group row -->
    <ng-container matColumnDef="groupHeader">
      <mat-cell *matCellDef="let group">
        <moh-mat-table-group-row [group]="group" [groupByColumns]="groupByColumns"></moh-mat-table-group-row>
      </mat-cell>
    </ng-container>
    <mat-row *matRowDef="let row; columns: ['groupHeader']; when: mohMatTableService.isGroup"> </mat-row>
  ```

 
  ```typescript
    groupByColumns: string[] = ['id'];
    this.mohMatTableService.initDataSource(this.dataSource, this.dataObjects);
    this.mohMatTableService.addGroups(this.dataObjects, this.groupByColumns).then(data => {
         this.mohMatTableService.updateDataSource(data);
    });
  ```
*/
@Component({
  selector: 'moh-mat-table-group-row',
  templateUrl: './mat-table-group-row.component.html',
  styleUrls: ['./mat-table-group-row.component.scss']
})
export class MatTableGroupRowComponent implements OnInit {
  private _groupByColumns: string[] = [];
  private _group: Group;
  private _data: any[];

  dataSource = new MatTableDataSource<any | Group>([]);

  /**
 * groupByColumn input :array of strings.
 * the columns name (must be like the property name of the data object) of the grouping
 * the order is important, it determines the hierarchy.
 */
  @Input()
  set groupByColumns(groupByColumns: string[]) {
    this._groupByColumns = groupByColumns;
  }
  get groupByColumns(): string[] {
    return this._groupByColumns;
  }

   /**
 * group input :group object.
 * the group object of the group row
 */
  @Input()
  set group(group:Group) {
    this._group = group;
  }
  get group(): Group {
    return this._group;
  }


  
  constructor(private matTableService: MohMatTableService) { }

  ngOnInit() {
   
  }
  
  /*** 
   * when the row group is clicked
   * the functionality if the rows of the group will be visible or not.
   */
  groupHeaderClick(row) {
    row.expanded = !row.expanded;
    this.matTableService.groupHeaderClick(this.groupByColumns);

  }









}


