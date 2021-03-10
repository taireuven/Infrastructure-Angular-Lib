import { OnInit, Injector, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BaseAbstractControl } from '../../base/base-abstract-control';
import { Observable } from 'rxjs';

export class PasswordBase extends BaseAbstractControl implements OnInit {

  passwordType: string;
  capsLockOn: boolean;
  showOrHidePasswordTextValue: Observable<string>;
  /**
  * The 'Caps Lock' message text key.
  */
  @Input() textKeyCapsLock: string = 'capsLockOn';
  /**
  * The 'Caps Lock' message text.
  */
  @Input() labelTextCapsLock: string;
  /**
  * The textbox placeholder.
  */
  @Input() placeholder: string = '';
  /**
  * The textbox placeholder key.
  */
  @Input() placeholderKey: string = '';
  /**
  * Max length of the textbox value.
  */
  @Input() maxlength: number;
  /**
 * Event emitted when the password is blured.
 */
  @Output() blur: EventEmitter<any> = new EventEmitter();
  /**
  * Event emitted when the password is focused.
  */
  @Output() focus: EventEmitter<any> = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);

    this.baseAbstractControl = new FormControl();
  }

  ngOnInit() {
    this.passwordType = 'password';
    this.showOrHidePasswordTextValue = this.getLabelText("showPassword");
    super.ngOnInit();
  }

  onKeyDown(event: KeyboardEvent): void {
    const capsOn = event.getModifierState && event.getModifierState('CapsLock');
    if (capsOn) {
      this.capsLockOn = true;
    } else {
      this.capsLockOn = false;
    }
  }

  toggleInputType() {
    if (!this.isDisabled) {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
      this.showOrHidePasswordTextValue = this.passwordType === 'password' ? this.getLabelText("showPassword") : this.getLabelText("hidePassword");
    }
  }

  onBlur() {
    this.onTouched();
    this.blur.emit(null);
  }

  onFocus() {
    this.focus.emit();
  }
}

