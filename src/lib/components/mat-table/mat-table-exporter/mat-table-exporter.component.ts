import { Component, OnInit , Input} from '@angular/core';
import {MohMatTableService} from '../moh-mat-table.service';

/**
 * The Mat table export component is used to export data to an excel file.
 * the data that will be exported doesn't include the group rows.
 * The component uses the moh mat table service, you must initialize the data in your ts code (mohMatTableService.initDataSource)

 * 
 * ### Usage 
 * 
  ```html
  
   <moh-mat-table-exporter [displayColumns]="displayColumns" [fileName] ="'test1'" [textKey]="'ExportToExcel'"></moh-mat-table-exporter>
  ```
  
  ```typescript
   this.mohMatTableService.initDataSource(this.dataSource, this.dataObjects);
   ```
*/
@Component({
  selector: 'moh-mat-table-exporter',
  templateUrl: './mat-table-exporter.component.html',
  styleUrls: ['./mat-table-exporter.component.scss']
})
export class MatTableExporterComponent implements OnInit {

  private _displayColumns: string[];
  private _fileName: string = 'exporter';
  private _text: string ;
  private _textKey: string ;

 /**
  * displayColumns input (optional)
  * array of the columns name that will be shown in the excel file
  */

  @Input()
  set displayColumns(displayColumns: string[]) {
    this._displayColumns = displayColumns;
  }
  get displayColumns(): string[] {
    return this._displayColumns;
  }

/**
 * fileName input
 * the name of the excel file that will be exported
 */
 
  @Input()
  set fileName(fileName: string) {
    this._fileName = fileName;
  }
  get fileName(): string {
    return this._fileName;
  }


  /**
   * text input : string
   * the import button text
   */
  @Input()
  set text(text: string) {
    this._text = text;
  }
  get text():string {
    return this._text;
  }

  /**
 * textKey input :string 
 * the text key (from Umbraco) of the button
 * to support different languages need to use it
 */
  @Input()
  set textKey(textKey: string) {
    this._textKey = textKey;
  }
  get textKey():string {
    return this._textKey;
  }
  

  constructor(private mohMatTableService:MohMatTableService ) { }

  ngOnInit() {
  }

  // export the data
  export(){
    this.mohMatTableService.exportAsExcelFile(this.fileName, this.displayColumns);

  }
}
