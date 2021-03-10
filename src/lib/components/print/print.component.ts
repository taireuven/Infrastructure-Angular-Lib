import { Component, OnInit, Input, Injector} from '@angular/core';
import { PrintService } from './print.service';
import { ButtonBase } from '../button/base/button.base';

/**
 * The print component provide button with functionality to navigate to component and print it out.
 * the path value should be declared in app-routing.module.ts
 *
 * ### Usage
  ```html

   <!-- basic print -->
   <moh-print [path]="'user'" ></moh-print>


   <!-- print with some inputs -->
   <moh-print [textKey]="'print'" [path]="'user'" position="right" ></moh-print>


  ```
 *
*/
@Component({
  selector: 'moh-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent extends ButtonBase {

   /**
  * The route path of the printed component.
  */
  @Input() path: string;

  constructor(private printService: PrintService, injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  print() {
    this.printService.printDocumentByPath(this.path);
  }

}
