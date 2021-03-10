import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {MohTranslateService} from "../../translate/moh-translate.service";


@Component({
    selector: 'moh-date-cell',
    template:  `<span> 
                    <div  class="moh-ag-cell-outer-div" [attr.data-title]="translate.getInstantLabelText('labels.'+params.translateCode) + ':'">
                        <div class="moh-ag-cell-inner-div" title="{{params.value}}">
                            <label>{{ params.value | date : params.mohValueFormatter }}</label> 
                        </div>
                    </div>
               </span>`
})

export class DateCellRendererComponent  implements ICellRendererAngularComp   {
    public params: any;

    constructor (public  translate: MohTranslateService){
       
    }

    agInit(params: any): void {
        this.params = params;
    }
  
    refresh(): boolean {
        return false;
    }
}
