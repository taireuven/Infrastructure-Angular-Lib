import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
   
  isPrinting: boolean = false;
  constructor(private router: Router) {
  }

  printDocumentByPath(path: string): any {
    this.isPrinting = true;
    this.router.navigate(['/',
      {
        outlets: {
          'print': ['print', path]
        }
      }
    ])
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }]);
    });
  }
}
