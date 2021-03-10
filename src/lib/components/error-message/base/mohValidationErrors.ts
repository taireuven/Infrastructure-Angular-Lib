import {  ValidationErrors } from "@angular/forms";

/**
 * Defines the map of errors returned from failed validation checks
  ```typescript
   type MohValidationErrors = {
     [key: string]: {
       errorMessage?: string,
       errorMessageKey?: string,
       [key: string]: any
     };
   };
  ```
 */
export declare type MohValidationErrors = { 
  [key: string]: {
    errorMessage?: string,
    errorMessageKey?: string,
    [key: string]: any
  };
};
