import { Injectable, Inject, Injector } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { isNullOrUndefined } from 'util';

/**
 * This service is responsible to the functionalty in the different mat table components.
 * All the changes and the updates of the mat table data source object are done in this service.
 */
@Injectable()
export class MohMatTableService {
  constructor() {

  }
  /**
   * indicate if the grouping is in use.
   */
  private groupingFlag = false;
  /**
   * indicate if the custom filtering is in use.
   */
  private filteringFlag = false;
  /**
   * the basic filter predicate that used for filtering only.
   */
  private originalFilterPredicate: any;
  /**
   * mat table data source object . this is the object that all the components of mat table use it.
   */
  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  /**
   * the original data before updates and changes.
   */
  public originalData: any[];
  /**
   * the array of objects that will be shown in the mat table.
   */
  public data: any[];
  /**
   * a subject that responsible for updating the data of the dataSource.
   */
  public dataSubject: Subject<any[]>;
  /**
   * the current state of the filtering of the table (name of each filterted column and the values).
   */
  public filteredColumns: any = {};
  /**
   * array of string. the columns names of the grouping columns.
   * the order is important because it declares the hierarchy of the grouping.
   * the column name must be the property name of the object in the data array.
   */
  public groupByColumns: any[] = [];
  public displayColumns: any[] = [];

  /**
   * initialize the original data and the data source and the subscription of the data subject.
   * this function must be ran if the client use the mat-table service or components!!!
   * @param dataSource the matTableDataSource of the mat table.
   * @param data the array of objects that are the core data.
   * @param displayColumns
   */
  initDataSource(dataSource: MatTableDataSource<any[]>, data: any[], displayColumns?: string[]): void {
    this.dataSource = dataSource;
    this.data = data;
    this.originalData = JSON.parse(JSON.stringify(data));


    this.dataSubject = new Subject<any[]>();
    this.dataSubject.subscribe({
      next: (data: any[]) => {
        this.data = data;
        this.originalData = JSON.parse(JSON.stringify(data));
        this.dataSource.data = data;
      }
    });
    if (displayColumns && displayColumns.length > 0) {
      this.displayColumns = displayColumns;
    }
  }

  /**
   * the function updates the data of the datasource object with the data input.
   * @param data array of objects
   */
  updateDataSource(data: any[]) {
    this.dataSubject.next(data);
  }

  /**
   * returns the data source object.
   * @returns the data source object.
   */
  getDataSource(): MatTableDataSource<any[]> {
    return this.dataSource;
  }

  getGeneralSearch(): any {
    return this.filteredColumns["general◬"] || '';
  }


  /*** filter functions */
  /**
   * this function updates the filter predicate of the mat table data source to the relevant filter predicate.
   * @param predicate data an object / row from the mat table, filter is a json object for filtering(the key is the name of the column and the value is the filtered data value)
   */
  updateFilterPredicate(predicate?: (data: any, filter: object) => boolean) {
    let filterPredicate;

    if (!this.originalFilterPredicate) {
      this.originalFilterPredicate = this.getFilterPredicate();
    }
    this.filteringFlag = true;
    if (this.groupingFlag) {
      this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    }
    else {
      this.dataSource.filterPredicate = this.originalFilterPredicate;
    }
  }

  /**
   * the function updates the new filtered value when the user is typing
   */
  updateFilterValue() {
    this.dataSource.filter = this.getFilter();
  }

  /**
   * The function updates the filteredColumn object.
   * @param key the name of the filtered column
   * @param value the filter value
   */
  updateKeyValue(key: string, value: any) {
    if (!isNullOrUndefined(value) &&
      ((!value.hasOwnProperty('length') && value.toString().trim() != "") ||
        (value.hasOwnProperty('length') && value.length > 0))) {
      if (this.filteredColumns && this.filteredColumns.hasOwnProperty(key)) {
        this.filteredColumns[key] = value;
      }
      else {
        this.filteredColumns = {
          ...this.filteredColumns,
          [key]: value
        };
      }
    }
    else if (this.filteredColumns.hasOwnProperty(key)) {
      delete this.filteredColumns[key];
    }
  }

  /**
   * The function returns a json object of the filtered columns
   */
  private getFilter() {
    return JSON.stringify(this.filteredColumns);
  }

  /**
   * The function returns the predicate filter of mat table according to the filtered columns.
   */
  private getFilterPredicate(): (data: any, filter: string) => boolean {
    let filterFunction = (data, filter): boolean => {
      let searchTerms = JSON.parse(filter);
      let condition = true;
      for (let key in searchTerms) {
        if (key === 'general◬') { // general search
          let subCurrentTerm = '';
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            if (this.displayColumns.length > 0 && this.ifColumnInDisplayCol(key) || this.displayColumns.length == 0) {
              subCurrentTerm = subCurrentTerm + (data as { [key: string]: any })[key] + '◬';
            }
            return currentTerm + subCurrentTerm;
          }, '').toLowerCase();


          condition = condition && dataStr.indexOf(searchTerms[key].toString().trim().toLowerCase()) !== -1; //(data &&  data.toString().toLowerCase().indexOf(searchTerms[key].toString().trim().toLowerCase()) !== -1);
        }
        else if (searchTerms[key] instanceof Array) {
          let subCondition = false;
          searchTerms[key].forEach(item => {
            subCondition = subCondition || (!isNullOrUndefined(data[key]) && data[key].toString().toLowerCase().indexOf(item.toString().trim().toLowerCase()) !== -1);
          });
          condition = condition && (subCondition);
        }
        else if (this.isDate(searchTerms[key])) {
          let value = data[key] instanceof (Date) ? data[key].toLocaleDateString() : data[key];
          condition = condition && (value && value.toString().indexOf(new Date(searchTerms[key]).toLocaleDateString()) !== -1);
        }
        else {
          condition = condition && (data[key] && data[key].toString().toLowerCase().indexOf(searchTerms[key].toString().trim().toLowerCase()) !== -1);
        }
      }
      return condition;

    }
    return filterFunction;
  }

  /**
   * the function gives the option to get an filter predicate from the user and override the filter predicate.
   * @param filterPredicate filter predicate that get a data(an object / row of the table) and object for the value of the filtering.
   */
  overrideFilterPredicate(filterPredicate: (data: any, filter: object) => boolean): (data: any, filter: string) => boolean {
    let filterFunction;
    if (filterPredicate) {
      this.filteringFlag = true;
      let filterFunction = (data, filter): boolean => {
        let searchTerms = JSON.parse(filter);
        return filterPredicate(data, searchTerms);
      };
      this.originalFilterPredicate = filterFunction;
    }

    return filterFunction;
  }

  /**
   * the function checks if a variable is date.
   * @param s
   */
  private isDate(s): boolean {
    if (isNaN(s) && !isNaN(Date.parse(s)))
      return true;
    else return false;
  }

  ifColumnInDisplayCol(key: string) {
    return (this.displayColumns.indexOf(key.toString())) > -1;
  }
  /** End - filter functions */


  /** Grouping  functions **/

  /**
   * the function adds group rows to the data.
   * @param data an array of the data.
   * @param groupByColumns array of group columns.
   */
  addGroups(data: any[], groupByColumns: string[]): Promise<any[]> {
    let promise: Promise<any[]> = new Promise((resolve, reject) => {
      const rootGroup = new Group();
      rootGroup.expanded = true;
      this.groupingFlag = true;
      this.updateFilterPredicateWithGrouping();
      resolve(this.getSublevel(data, 0, groupByColumns, rootGroup));
    });
    return promise;
  }

  /**
   * the function returns the sub - data according to the parent group and the level of the grouping
   * @param data an array of the data.
   * @param level level of the grouping.
   * @param groupByColumns array of the grouping columns.
   * @param parent the group parent
   */
  private getSublevel(data: any[], level: number, groupByColumns: string[], parent: Group): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const groups = this.uniqueBy(
      data.map(
        row => {
          const result = new Group();
          result.level = level + 1;
          result.parent = parent;
          for (let i = 0; i <= level; i++) {
            result[groupByColumns[i]] = row[groupByColumns[i]];
          }
          return result;
        }
      ),
      JSON.stringify);

    const currentColumn = groupByColumns[level];
    let subGroups = [];
    groups.forEach(group => {
      const rowsInGroup = data.filter(row => JSON.stringify(group[currentColumn]) === JSON.stringify(row[currentColumn]));
      group.totalCounts = rowsInGroup.length;
      const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
      subGroup.unshift(group);
      subGroups = subGroups.concat(subGroup);
    });
    // }
    return subGroups;
  }

  /**
   * the function verifies that the data is uniqe and doesnt exist in the array
   * @param a
   * @param key
   */
  private uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  /**
   * the functionchecks if an item(row) is an instance of group
   * @param index
   * @param item
   */
  isGroup(index, item): boolean {
    return item.level;
  }

  /**
   * the actions for hiding or showing the rows of a group
   * @param groupByColumns array of group columns
   */
  groupHeaderClick(groupByColumns): void {
    this.groupByColumns = groupByColumns;
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
    if (this.filteringFlag) {
      this.dataSource.filter = this.getFilter();
    }
    else
      this.dataSource.filter = performance.now().toString();


  }

  /**
   * returns a custom filter predicate for grouping data
   * @param data
   * @param filter
   */
  private customFilterPredicate(data: any | Group, filter: string): boolean {
    if (this.originalFilterPredicate) {
      return ((data instanceof Group && data.visible) ||
        (this.originalFilterPredicate(data, filter) && this.getDataRowVisible(data)));
    }
    return (data instanceof Group) ? data.visible : this.getDataRowVisible(data);

  }

  /**
   * the function returns if the row has to be visible or not.
   * @param data an object or row of the mat table
   */
  private getDataRowVisible(data: any): boolean {
    const groupRows = this.dataSource.data.filter(
      row => {
        if (!(row instanceof Group)) {
          return false;
        }
        let match = true;
        this.groupByColumns.forEach(column => {
          if ((row[column] && data[column] && JSON.stringify(row[column]) !== JSON.stringify(data[column]))
            || ((!row[column] && data[column]) || (row[column] && !data[column]))) {
            match = false;
          }
        });
        return match;
      }
    );

    if (groupRows.length === 0) {
      return true;
    }
    const parent = groupRows[0] as Group;
    return parent.visible && parent.expanded;
  }

  /**
   * the function updates the current filter predicate with grouping
   * @param filterPredicate an object or row of the mat table
   */
  private updateFilterPredicateWithGrouping(filterPredicate?: ((data: any, filter: string) => boolean)) {
    if (filterPredicate)
      this.originalFilterPredicate = filterPredicate;
    this.dataSource.filterPredicate = this.customFilterPredicate.bind(this);
  }

  /** End - Grouping  functions **/

  /** Export to excel */

  /**
   * the function exports the data to an excel file.
   * @param excelFileName the name of the exported file.
   * @param displayColumns the name of the columns that will be exported to the excel file
   */
  exportAsExcelFile(excelFileName: string, displayColumns?: string[]): void {
    let data: any[] = [];
    if (displayColumns && displayColumns.length > 0) {
      this.data.forEach(item => {
        let obj = {};
        displayColumns.forEach(col => {
          if (item[col]) {
            obj[col] = item[col];
          }
        });
        if (Object.keys(obj).length > 0) {
          data.push(obj);
        }
      });
    }
    else data = this.data;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Sheet1': worksheet }, SheetNames: ['Sheet1'] };
    XLSX.writeFile(workbook, excelFileName + '.xlsx');
  }

  /** Edit functions **/
  cancelEdit(): void {
    this.dataSubject.next(this.originalData);
  }

  getDataAfterEdit(): any[] {
    let data = [];
    this.data.forEach(element => {
      if (!this.isGroup(null, element)) {
        data.push(element);
      }
    });
    return data;
  }

  /** End - edit functions **/





}

export class Group {
  level = 0;
  parent: Group;
  expanded = true;
  totalCounts = 0;
  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }

}







