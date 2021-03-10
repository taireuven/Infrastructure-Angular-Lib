import { Component, OnInit, forwardRef, Input, ViewChild, HostListener, ElementRef, Injector, Optional, SkipSelf, Host, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlContainer } from '@angular/forms';

import { BaseAbstractControl } from '../base/base-abstract-control';

@Component({
  selector: 'moh-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadComponent),
      multi: true
    }
  ]
})
export class SignaturePadComponent extends BaseAbstractControl implements OnInit, AfterViewInit {

  @Input() penColor?: string = 'black';
  @Input() width?: number = 300;
  @Input() height?: number = 150;

  @ViewChild('sigPad', { static: true }) sigPad;
  sigPadElement: HTMLCanvasElement;
  context: any;
  isDrawing: boolean = false;

  constructor(injector: Injector, @Optional() @Host() @SkipSelf() private parentFormContainer: ControlContainer) {
    super(injector);
  }

  ngOnInit() {
    if (this.parentFormContainer) {
      this.baseAbstractControl = this.parentFormContainer['form'].controls[this.formControlName];
    }
    this.sigPadElement = this.sigPad.nativeElement;
    this.context = this.sigPadElement.getContext('2d');
  }

  ngAfterViewInit(){
    this.context.strokeStyle = this.penColor;
  }

  @HostListener('document:mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onMouseUp(e) {
    if (this.isDrawing) {
      this.propagateChange(this.sigPadElement.toDataURL("image/png"));
    }
    this.isDrawing = false;
  }

  @HostListener('touchstart', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchmove', ['$event'])
  onEvent(e) {
    if (e.target == this.sigPadElement) {
      e.preventDefault();
    }
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX ? event.clientX - bounds.left : event.touches[0].clientX - bounds.left;
    const y = event.clientY ? event.clientY - bounds.top : event.touches[0].clientY - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
    this.propagateChange('');
  }
}



//import { Component, OnInit, Renderer2, SkipSelf, Host, Optional, Inject, forwardRef } from '@angular/core';
//import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';

//import { SignaturePadControlComponent } from './angular-signature-pad/components/signature-pad-control/signature-pad-control.component';
//import { ISignaturePadConfig } from './angular-signature-pad/interfaces/signature-pad-config.interface';
//import { GlobalSignaturePadConfig } from './angular-signature-pad/tokens/global-config.token';

//@Component({
//  selector: 'moh-signature-pad',
//  templateUrl: './signature-pad.component.html',
//  styleUrls: ['./signature-pad.component.css'],
//  providers: [
//    {
//      provide: NG_VALUE_ACCESSOR,
//      useExisting: forwardRef(() => SignaturePadComponent),
//      multi: true
//    }
//  ]
//})
//export class SignaturePadComponent extends SignaturePadControlComponent implements OnInit {

//  constructor(
//    renderer: Renderer2,
//    @Optional() @Host() @SkipSelf() parentFormContainer: ControlContainer,
//    @Optional() @Inject(GlobalSignaturePadConfig) defaultConfig?: ISignaturePadConfig
//  ) {
//    super(renderer, parentFormContainer, defaultConfig);
//  }

//  ngOnInit() {
//    super.ngOnInit();
//  }

//}
