import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx';
import { ModalService } from '../../../services/modal/modal.service';

/**
 * The Mat table import component is used to import data from an excel file.
 * The excel file must contain in the first row the name of the columns , the same name in the object.
 * The type of all the cell values that provided from the file are text (string) so in  (afterImportComplete) output you have to convert if needed
 * In addition you should update the table datasource with the new data in (afterImportComplete) output. 
 * if you use  the moh mat table service functions you should initialize the data in your ts code (mohMatTableService.initDataSource)
 * 
 * ### Usage 
 * 
  ```html
  
   <moh-mat-table-import [(data)]="dataObjects" [textKey]="importTextKey" (afterImportComplete)="importUpdateTable()">
   </moh-mat-table-import>
  ```
  
  ```typescript
   importTextKey:string = 'ImportFromExcel';
  
   importUpdateTable(data) {
    data.map(item=> {
      if (!isNaN(Date.parse(item.brithDate))){
        item.brithDate= new Date(item.brithDate);
      }
    })
    this.dataObjects.push(...data);
    this.mohMatTableService.updateDataSource(this.dataObjects);
     importUpdateTable(data) {
    data.map(item=> {
      if (!isNaN(Date.parse(item.brithDate))){
        item.brithDate= new Date(item.brithDate);
      }
    })
    this.dataObjects.push(...data);
    this.mohMatTableService.updateDataSource(this.dataObjects);
    // uncomment if you use the grouping 
    //this.mohMatTableService.addGroups(this.dataObjects, this.groupByColumns).then(data => {
    //  this.mohMatTableService.updateDataSource(data);
    //});

  ```
*/
@Component({
  selector: 'moh-mat-table-import',
  templateUrl: './mat-table-import.component.html',
  styleUrls: ['./mat-table-import.component.scss']
})
export class MatTableImportComponent implements OnInit {
  private _data: any[] = [];
  private _text: string;
  private _textKey: string;

  /**
   * text input : string
   * the import button text
   */
  @Input()
  set text(text: string) {
    this._text = text;
  }
  get text(): string {
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
  get textKey(): string {
    return this._textKey;
  }

  @Input() errorMessageKey:string = 'importTableErrorMessage';

  /**
 * dataChange output
 * the event that will be occors after the import is done
 * It is also used for updating the datasource of mat table in the parent component 
 */
  @Output() onImport = new EventEmitter<any[]>();

  constructor(private cdr: ChangeDetectorRef, private modal: ModalService) { }

  ngOnInit() {
  }

  //import the data from excel file after it is uploaded 
  importExcel(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.parseExcel(event.target.files[0]).then((excelData:any) => {
        if (excelData && excelData.length > 0)
          this.onImport.emit(excelData);
      });
    }
  }

  // parse the excel and convert the new data to objects
  parseExcel(file) {
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      reader.onload = (e) => {
        var data = new Uint8Array((<any>e.target).result);
        let excelData: any[] = [];
        try {
          var workbook = XLSX.read(data, { type: 'array' });
          workbook.SheetNames.forEach((sheetName => {
            let XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            let json_object = JSON.stringify(XL_row_object);
            //add the new data row
            excelData.push.apply(excelData, JSON.parse(json_object));
            resolve(excelData);
          }).bind(this), this);
        } catch (e) {
          this.modal.errorMsgWithTranslation(this.errorMessageKey);
          reject(new DOMException("Problem parsing input file ->" + e));
        }

      };
      reader.readAsArrayBuffer(file);
    });



  }

}
