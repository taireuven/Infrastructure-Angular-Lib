import { Component, OnInit, Injector, forwardRef, Output, EventEmitter, Input, ViewChild,AfterViewInit, OnDestroy } from '@angular/core';
import { BaseAbstractControl } from '../../base/base-abstract-control';
import { FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { MohTranslateService, MohLangChangeEvent } from '../../../moh-angular-lib.module';
import { CKEDITOR } from '@wiris/mathtype-ckeditor4';

declare var CKEDITOR: any;
export class RichTextEditorBase extends BaseAbstractControl implements OnInit{

  @Input() config = {};
  
  constructor(injector: Injector, private mohTranslateService: MohTranslateService) {
    super(injector);
    this.baseAbstractControl = new FormControl();
    this.config['language'] = this.config['language'] ? this.config['language'] : 'he';
    //mathjax,,ckeditor_wiris
    this.config['extraPlugins'] = this.config['extraPlugins'] ? this.config['extraPlugins'] : 'divarea,ckeditor_wiris';//mathjax,
   //this.config['mathJaxLib'] = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML';
   
    this.config['toolbarGroups'] = this.config['toolbarGroups'] ? this.config['toolbarGroups'] : [
      { name: 'clipboard', groups: ['clipboard', 'undo'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
      { name: 'links' },
      { name: 'insert' },
      { name: 'forms' },
      { name: 'tools' },
      { name: 'document', groups: ['mode', 'document', 'doctools'] },
      { name: 'others' },
      '/',
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi'] },
      { name: 'styles' },
      { name: 'colors' },
      { name: 'about' }
   ];
  }

  ngOnInit() {
    super.ngOnInit();

    let ckjs = document.getElementById('ckeditor_js');
    if (ckjs) {
      return;
    }

    const url = '//cdn.ckeditor.com/4.11.3/full-all/ckeditor.js';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'ckeditor_js';
    document.body.appendChild(script);

    script.onload = function () {
      CKEDITOR.plugins.addExternal('ckeditor_wiris', 'https://www.wiris.net/demo/plugins/ckeditor/', 'plugin.js');
    }
    script.src = url;
  }
}
