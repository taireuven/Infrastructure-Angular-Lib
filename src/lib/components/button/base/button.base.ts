// use ex:   <moh-button text="שלח בקשה" isDisabled=ture iconName="keyboard_arrow_left" buttonStyle="moh-mainBtn"></moh-button>
// [text]?: string;
// [isDisabled]: boolean;  the defualt is false
// [iconName]?: string;
// [buttonStyle]: ButtonStyle; the options at this point are "moh-mainBtn","moh-subBtn",
// (click):EventEmitter
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Injector } from '@angular/core';
import { LabelBase } from '../../base/label-base';

export class ButtonBase extends LabelBase implements OnInit {
  /**
 * The text to be displayed on the button.
 */
  @Input() text?: string;
  /**
 * Whether the button should be disabled or not.
 */
  @Input() isDisabled: boolean = false;
  /**
 * Mat icon name to display on the button.
 */
  @Input() iconName?: string;
  /**
 * icon position on element.
 */
  @Input() position?: 'left' | 'right' = 'left';
  /**
  /**
   * Event emitted when the button is clicked.
   */
  @Output() onButtonClick = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }

  onClick(event: Event) {
    this.onButtonClick.emit(event);
  }

}
