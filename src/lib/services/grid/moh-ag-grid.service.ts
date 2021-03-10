import { Injectable, Inject, Injector } from '@angular/core';
import { GridOptions, ColDef } from 'ag-grid-community';
import { LabelBase } from '../../components/base/label-base';
import { MohDateAdapter } from '../../components/datepicker/base/datepicker.base';
import {DateCellRendererComponent } from  './cellRenderComponents/date-cell-render.component';
import { LinkCellRendererComponent } from './cellRenderComponents/link-cell-renderer.component';
import "ag-grid-enterprise";
import { LicenseManager } from 'ag-grid-enterprise';

export class colExtraDef {
  translateCode?: string = '';
  editable?: boolean = false;
  isPinned?: boolean = false;
  valueFormatter?: string = 'dd/MM/yyyy';
  matIconName?: string = null;
  routerLink?: string = null;
  arrayParams?: string[] = null;
  constructor(params: colExtraDef) {
    // object.assign will overwrite defaults if params exist
    Object.assign(this, params)
  }
}


@Injectable()
export class MohAgGridService extends LabelBase{
  constructor( injector: Injector) {
    super(injector);
    LicenseManager.setLicenseKey("Business_Design_(L.A_Software)_Ltd._on_behalf_of_The_Ministry_of_Health_MultiApp_3Devs_1Deployment_11_July_2020__MTU5NDQyMjAwMDAwMA==f2811ac32f6e0b09c303fa3f265df40e");
    }

  getMohGridOptions=():any=> {
    const mohGridOptions: GridOptions = {};
    mohGridOptions.enableSorting = true;
    mohGridOptions.pagination = true;
    mohGridOptions.paginationPageSize = 5;
    mohGridOptions.ensureDomOrder = true;
    mohGridOptions.enableRtl = true;
    mohGridOptions.floatingFilter = true;
    mohGridOptions.suppressColumnVirtualisation = false;
    mohGridOptions.rowBuffer = 30;
    mohGridOptions.rowHeight = 65;
    mohGridOptions.headerHeight = 65;
    mohGridOptions.paginationAutoPageSize = true;
    mohGridOptions.components= {'cellRendererCustom': this.cellRendererCustom};
    mohGridOptions.localeText= { 
      page: 'דף',
      more: 'עוד',
      to: 'ל',
      of: 'מתוך',
      next: 'הבא',
      last: 'אחרון',
      first: 'ראשון',
      previous: 'הקודם',
      loadingOoo: 'טוען....',
    };
   // mohGridOptions.localeText =this.umbracoDataService.getTranslatedDictionary( this.mohTranslateService.currentLang,"AgGrid");
    //mohGridOptions.onGridReady =(params):any=> { params.api.sizeColumnsToFit();};
    mohGridOptions.onGridSizeChanged = (params): any => {
      const eGridDiv = document.querySelector('.ag-theme-material');
      if (eGridDiv.clientWidth <= 449) { params.api.sizeColumnsToFit(); console.log("SizeTofit");};
    }
    return mohGridOptions;
  }
  getMohColumn(field: string, params: colExtraDef = {}, colDef: ColDef = {} as ColDef): ColDef {
    return this.setDefaultsToColDef(field, params,colDef);
  }
  getMohDateColumn(field: string, params: colExtraDef): ColDef {
   var colDef = this.setDefaultsToColDef(field, params);
   colDef.cellRenderer = null; // Override cellRendererCustom
   colDef.cellRendererParams.mohValueFormatter = params.valueFormatter ;
   colDef.cellRendererFramework = DateCellRendererComponent;
   colDef.filter = 'agDateColumnFilter';
    return colDef;
  }
  getMohLinkColumn(field: string, params: colExtraDef): ColDef {
    var colDef = this.setDefaultsToColDef(field, params);
    colDef.cellRenderer = null; // Override cellRendererCustom
    colDef.cellRendererParams.matIconName = params.matIconName;
    colDef.cellRendererParams.routerLink = params.routerLink;
    colDef.cellRendererParams.arrayParams = params.arrayParams;
    colDef.cellRendererFramework = LinkCellRendererComponent; 
     return colDef;
  }
  getMohSelectColumn(field: string, params: colExtraDef): ColDef {
    var colDef = this.setDefaultsToColDef(field, params);
    colDef.cellEditor = 'agSelectCellEditor';
    colDef.cellEditorParams = {
      values: params.arrayParams
    };
    return colDef
  }
  /*getMohEditDateColumn(field: string, translateCode: string = "", rowGroup: boolean = false): ColDef {
    var colDef = this.getMohDateColumn(field, translateCode, null, true, rowGroup);
    colDef.editable = true;
    colDef.cellEditor = 'MohDateAdapter';
    return colDef
  }*/
  cellRendererCustom = (params)=>  {
    const value = params.value || params.value === 0 ? params.value : '';
    //tabindex="${Array.prototype.indexOf.call(params.eGridCell.parentElement.childNodes, params.eGridCell)}"
    var translateCode = params.colDef.cellRendererParams == undefined ? params.colDef.headerName : params.colDef.cellRendererParams.translateCode;
    return `<div  class="moh-ag-cell-outer-div" data-title="${this.getInstantLabelText(translateCode)}:">
              <div class="moh-ag-cell-inner-div" title="${value}">
                <label>${value}</label>
              </div>
            </div>`;
  };
  getAllData(gridApi:any) {
    let rowData = [];
    gridApi.forEachNode(node => rowData.push(node.data));
    return rowData;
  }
  
  private setDefaultsToColDef(field: string, params: colExtraDef, colDef: ColDef = {} as ColDef): ColDef {
    colDef.field = field;
    colDef.editable = params.editable;
    params.translateCode = params.translateCode || field;
    colDef.headerName = this.getInstantLabelText(params.translateCode);
    colDef.cellRendererParams = { translateCode: params.translateCode };
    colDef.cellRenderer = 'cellRendererCustom';
    colDef.floatingFilterComponentParams = { suppressFilterButton: true }
    colDef.lockPinned = true;
    colDef.pinned = params.isPinned ? 'right':null;
    /*if (rowGroup) {
      colDef.rowGroup = rowGroup;
      colDef.showRowGroup = true,
        // set the cell renderer to 'group'
      colDef.cellRenderer='agGroupCellRenderer',
          // provide extra params to the cellRenderer
      colDef.cellRendererParams= {
        suppressCount: false, // turn on the row count
        suppressDoubleClickExpand: true, // turn off double click for expand
        checkbox: false, // disable checkbox selection
      }
    }*/
    return colDef;
  }
}


   
    //http://umbracodataproviderapi.dev.health.gov.il/he/content/api/dictionary/AgGrid/items

/*
mohGridOptions.localeTextFunc=(key, defaultValue):any=> {
  var gridKey =  key; 
  let value= this.getInstantLabelText(key);
   this.mohTranslateService.getLabelText(key).subscribe( value => {
    return value === gridKey ? defaultValue : value;
  },error => console.log("Error  loader  mohGridOptions.localeText : " + error)
  );
  return value === gridKey ? defaultValue : value;}*/
    /*mohGridOptions.localeText = {
      page: this.getInstantLabelText("page"),
      more: this.getInstantLabelText("more"),
      to: this.getInstantLabelText("to") ,
      of: this.getInstantLabelText("of"),
      next: this.getInstantLabelText("next"),
      last:this.getInstantLabelText("last"),
      first: this.getInstantLabelText("first") ,
      previous: "daPreviousen",
      loadingOoo: "daLoading...",
      selectAll: "daSelect Allen",
      searchOoo: "daSearch...",
      blanks: "daBlanc",
      filterOoo: "daFilter...",
      applyFilter: "daApplyFilter...",
      equals: "daEquals",
      notEqual: "daNotEqual",
      lessThan: "daLessThan",
      greaterThan: "daGreaterThan",
      lessThanOrEqual: "daLessThanOrEqual",
      greaterThanOrEqual: "daGreaterThanOrEqual",
      inRange: "daInRange",
      contains: "daContains",
      notContains: "daNotContains",
      startsWith: "daStarts dawith",
      endsWith: "daEnds dawith",
      group: "laGroup",
      columns: "laColumns",
      filters: "laFilters",
      rowGroupColumns: "laPivot Cols",
      rowGroupColumnsEmptyMessage: "la drag cols to group",
      valueColumns: "laValue Cols",
      pivotMode: "laPivot-Mode",
      groups: "laGroups",
      values: "laValues",
      pivots: "laPivots",
      valueColumnsEmptyMessage: "la drag cols to aggregate",
      pivotColumnsEmptyMessage: "la drag here to pivot",
      toolPanelButton: "la tool panel",
      noRowsToShow: "la no rows",
      pinColumn: "laPin Column",
      valueAggregation: "laValue Agg",
      autosizeThiscolumn: "laAutosize Diz",
      autosizeAllColumns: "laAutsoie em All",
      groupBy: "laGroup by",
      ungroupBy: "laUnGroup by",
      resetColumns: "laReset Those Cols",
      expandAll: "laOpen-em-up",
      collapseAll: "laClose-em-up",
      toolPanel: "laTool Panelo",
      export: "laExporto",
      csvExport: "la CSV Exportp",
      excelExport: "la Excel Exporto",
      pinLeft: "laPin &lt;&lt;",
      pinRight: "laPin &gt;&gt;",
      noPin: "laDontPin &lt;&gt;",
      sum: "laSum",
      min: "laMin",
      max: "laMax",
      none: "laNone",
      count: "laCount",
      average: "laAverage",
      copy: "laCopy",
      copyWithHeaders: "laCopy Wit hHeaders",
      ctrlC: "ctrl n C",
      paste: "laPaste",
      ctrlV: "ctrl n V"
    };*/

