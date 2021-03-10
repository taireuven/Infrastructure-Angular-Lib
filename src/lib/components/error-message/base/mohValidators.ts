import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from "@angular/forms";
import { MohValidationErrors } from './mohValidationErrors';
// import { String, StringBuilder } from 'typescript-string-operations';
import * as momentImported from 'moment'; const moment = momentImported;

// const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/**
 * Repository of validations

  * ### Usage
   ```typescript
    import { mohValidators } from 'moh-package';
    
    export class ExampleComponent implements OnInit {
    
      constructor() {
    
        this.demoForm = this.fb.group({
          firstName: [null, [mohValidators.required('שדה חובה')]],
          lastName: ['', [mohValidators.minLength(2)]]
        });
      }
    }
   ```

  * ## Example for custom validation
  * To support displaying the error in errorMessage component should to return object type {@link MohValidationErrors}
   ```typescript
    static customValidation(message?: string, messageKey?: string): ValidatorFn {
      return (control: AbstractControl): MohValidationErrors | null => {

        validation logic...

        if(valid) return null;

        return {
          'validationName': { errorMessage:errorMessage, errorMessageKey: messageKey, [key: string]: any }
        };
      }
    }
   ```
  * @stable
  */

// @dynamic
export class mohValidators {

  /**
   * Validator that requires the control have a non-empty value.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static required(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.required(control), message, messageKey || 'required');
    }
  }

  /**
   * Validator that requires the control's value be true. This validator is commonly used for required checkboxes.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value. 
   */
  static requiredTrue(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.requiredTrue(control), message, messageKey || 'required');
    }
  }

  /**
   * Validator that requires the control's value to be greater than or equal to the provided number.
   * @param min The minimum valid number
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static min(min: number, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.min(min)(control), message, messageKey || 'min');
    }
  }

  /**
   * Validator that requires the control's value to be less than or equal to the provided number.
   * @param max The maximum valid number
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static max(max: number, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.max(max)(control), message, messageKey || 'max');
    }
  }

  /**
   * Validator that requires the length of the control's value to be greater than or equal to the provided minimum length.
   * @param minLength The minimum valid length.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static minLength(minLength: number, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.minLength(minLength)(control), message, messageKey || 'minlength');
    }
  };

  /**
   * Validator that requires the length of the control's value to be less than or equal to the provided maximum length.
   * @param maxLength The maximum valid length.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static maxLength(maxLength: number, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.maxLength(maxLength)(control), message, messageKey || 'maxlength');
    }
  };

  /**
   * Validator that requires the control's value an email validation test.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static email(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (!control.value || emailRegex.test(control.value)) {
        return null;
      }

      return {
        'email': { errorMessage: message, errorMessageKey: messageKey || 'email' }
      };
    }
  };

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @param digitsAfterDot
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static decimal(message?: string, messageKey?: string, digitsAfterDot: number = 2): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      var regex = new RegExp("^\\d+(\\.\\d{1," + digitsAfterDot + "})?$");// /^\d+(\.\d{1,2})?$/;
      if (!control.value || regex.test(control.value)) {
        return null;
      }

      return {
        'decimal': { errorMessage: message, errorMessageKey: messageKey || 'decimal', digitsAfterDot: digitsAfterDot }
      };
    }
  };

  /**
   * Validator that requires the control's value to match a regex pattern.
   * @param regExp The regular expression for test the value.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static pattern(regExp: string | RegExp, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern(regExp)(control), message, messageKey || 'pattern');
    }
  }

  /**
   * Validator that performs no operation.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static nullValidator(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.nullValidator(control), message, messageKey || 'nullValidator');
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static onlyHebrew(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern("^[א-ת]+$")(control), message, messageKey || 'pattern');
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static onlyEnglish(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern("^[a-zA-Z]+$")(control), message, messageKey || 'pattern');
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static onlyNumbers(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern("^[0-9]*$")(control), message, messageKey || 'pattern');
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static englishAndNumbers(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern("^[0-9a-zA-Z]+$")(control), message, messageKey || 'pattern');
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static hebrewAndNumbers(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern("[ א-ת0-9]+")(control), message, messageKey || 'pattern');
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static hebrewEnglishAndNumbers(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      return this.validation(Validators.pattern("^[ א-ת0-9a-zA-Z]+")(control), message, messageKey || 'pattern');
    }
  }

  //-----------START DATE VALIDATORS------------
  /**
   * 
   * @param date
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static validityDate(date: string, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      const dateRejex = /^\d{4} \d{1,2} \d{1,2}$/;

      if (!date || (dateRejex.test(date) && moment(date, 'YYYY MM DD').isValid())) return null;
      return {
        'isValidityDate': { errorMessage: message, errorMessageKey: messageKey || 'validityDate' }
      };
    }
  }

  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static dateRequired(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (control['controls']) {
        let dateErrors = mohValidators.required(message, messageKey)(control.get('year'));
        if (dateErrors) {
          return dateErrors;
        }
        else {
          dateErrors = mohValidators.required(message, messageKey)(control.get('month'));
          if (dateErrors) {
            return dateErrors;
          }
          else {
            return mohValidators.required(message, messageKey)(control.get('day'));
          }
        }
      }
      return null;
    }
  }

  /**
   * 
   * @param date
   * @param minDate
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static minDate(date: string, minDate: string, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (moment(date, 'YYYY-MM-DD').diff(moment(minDate)) >= 0) return null;
      return {
        'minDate': { errorMessage: message, errorMessageKey: messageKey || 'minDate' }
      };
    }
  }

  /**
   * 
   * @param date
   * @param maxDate
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static maxDate(date: string, maxDate: string, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (moment(date, 'YYYY-MM-DD').diff(moment(maxDate)) <= 0) return null;
      return {
        'maxDate': { errorMessage: message, errorMessageKey: messageKey || 'maxDate' }
      };
    }
  }
  //-----------END DATE VALIDATORS------------


  /**
   * Validator that requires the control's value a id number validation test.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static idNumber(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      let id: string = control.value;
      if (id) {
        if (id.length < 10) {
          let padString = ("000000000" + id).slice(-9);
          let digits = (padString).split('');
          let oneTwo: number[] = [1, 2, 1, 2, 1, 2, 1, 2, 1];
          let multiply: number[] = [9];
          let oneDigit: number[] = [9];

          for (let i = 0; i < 9; i++)
            multiply[i] = Number(digits[i].toString()) * oneTwo[i];

          for (let i = 0; i < 9; i++) {
            if (multiply[i] > 9)
              oneDigit[i] = Math.floor(multiply[i] / 10) + multiply[i] % 10;
            else
              oneDigit[i] = multiply[i];
          }

          let sum: number = 0;
          for (let i = 0; i < 9; i++)
            sum += oneDigit[i];
          if (sum % 10 == 0) {
            return null;
          }
        }

        return {
          'idNumber': { errorMessage: message, errorMessageKey: messageKey || 'idNumber' }
        }
      }
    };
  }

  //-----------START PHONE VALIDATORS------------
  /**
   * 
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static phoneRequired(message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (control['controls']) {
        let phoneNumberErrors = mohValidators.required(message, messageKey)(control.get('phoneNumber'));
        if (phoneNumberErrors) {
          return phoneNumberErrors;
        }
        else {
          return mohValidators.required(null, 'prefixRequired')(control.get('prefix'));
        }
      }
      return null;
    }
  }

  //-----------END PHONE VALIDATORS------------
  /**
  *
  * @param predicate Predicate function to conditionally set validator. if returns a value which is not false or empty the validator will be set.
  * @param validator validation to set on the control.
  * @param message Custom error message string.
  * @param messageKey Custom error message key.
  * @returns Function that receive abstractControl and return MohValidationErrors value.
  */
  static conditionalValidator(predicate: Function, validator: ValidatorFn, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (!control)
        return null;
      if (predicate()) {
        return validator(control);
      }
      return null;
    }
  }

  /**
   * 
   * @param predicate Predicate function to conditionally set validator. if returns a value which is not false or empty the validator will be set.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */
  static requiredIfValidator(predicate: Function, message?: string, messageKey?: string): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      if (!control)
        return null;
      if (predicate()) {
        return Validators.required(control);
      }
      return null;
    }
  }

  private static validation(errors: ValidationErrors, message?: string, messageKey?: string) {
    let mohValidationErrors: MohValidationErrors = {};
    if (errors) {
      let validationName = Object.keys(errors)[0];
      mohValidationErrors[validationName] = { errorMessage: message, errorMessageKey: messageKey };

      if (errors[validationName] != true) {
        for (let prop of Object.keys(errors[validationName])) {
          mohValidationErrors[validationName][prop] = errors[validationName][prop];
        }
      }
    }
    return errors ? mohValidationErrors : null;
  }



  //-----------START notMatch VALIDATORS------------
  /**
   *
   * @param pattern Custom pattern RegExp.
   * @param message Custom error message string.
   * @param messageKey Custom error message key.
   * @returns Function that receive abstractControl and return MohValidationErrors value.
   */

  static notMatch(pattern: any, message?: string, messageKey: string = 'notMatch'): ValidatorFn {
    return (control: AbstractControl): MohValidationErrors | null => {
      let charWithWornnig;
      if (control.value) charWithWornnig = control.value.replace(pattern, "");
      charWithWornnig = Array.from(new Set(charWithWornnig).values());
      return charWithWornnig.length > 0 ? { 'notMatch': { errorMessage: message, errorMessageKey: messageKey || 'notMatch', charWithWornnig: charWithWornnig } } : null
    }
  }
  //-----------END notMatch VALIDATORS------------


}
