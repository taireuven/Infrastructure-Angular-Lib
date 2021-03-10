import { mohValidators } from "../components/error-message/base/mohValidators";
import { ValidatorFn } from "@angular/forms";

/**
* A class  that contain some field for form control
*/
export class formControlInfo {
  /**
  * label text of the item
  */
 textValue?: string;
/**
  * label key of the item
  */
 textKey?: string;
 /**
  * parameters for the text key
  */
 textParams?: any;
 /**
  * value of the item
  */
 code?: any;
    /**
  * validatio of the item
  */
 validation?: ValidatorFn[]=[];

 // disabled?: boolean;

}

