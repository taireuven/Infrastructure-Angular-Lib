import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PrintService } from '../print.service';

@Component({
  selector: 'moh-print-layout',
  templateUrl: './print-layout.component.html',
  styleUrls: ['./print-layout.component.scss']
})
export class PrintLayoutComponent implements OnInit {

  state$: Observable<object>;
  @ViewChild("inner", { static: false }) inner: ElementRef;

  constructor(public activatedRoute: ActivatedRoute, private printService: PrintService) { }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() =>
        window.history.state));
  }

}
