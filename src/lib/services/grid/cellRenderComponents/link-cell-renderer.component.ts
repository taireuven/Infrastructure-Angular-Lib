import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import { MohTranslateService } from "../../translate/moh-translate.service";



@Component({
    selector: 'moh-link-cell',
    template:  `<span> 
                    <div class="moh-ag-cell-outer-div" [attr.data-title]="translate.getInstantLabelText('labels.'+params.translateCode) + ':'">
                        <div class="moh-ag-cell-inner-div" title="{{params.value}}">
                            <a class="moh-link" [routerLink]="params.routerLinkWithParam">
                            <i  *ngIf="params.matIconName" [class]="'moh-icon ' + params.matIconName "></i>    
                            {{params.value}}
                             </a> 
                        </div>
                    </div>
               </span>`
})

export class LinkCellRendererComponent  implements ICellRendererAngularComp   {
    public params: any;

    constructor (public  translate: MohTranslateService){
        //console.log("LinkCellRendererComponent");
    }

    agInit(params: any): void {
        //render parameter of link 
        this.params = params;
        this.params.routerLinkWithParam = this.params.routerLink;
         if (this.params.arrayParams )
            this.params.arrayParams.forEach(element => {
              this.params.routerLinkWithParam += "/" + this.params.data[element];//this.params.node.allLeafChildren[0].data[element]
            });
    }
  
    refresh(): boolean {
        return false;
    }
}
