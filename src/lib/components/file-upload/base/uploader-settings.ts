export class UploaderSettings {
  allowMimeTypes: string[];
  allowExtensions?: string[];
  maxFileSize: number;
  queueLimit: number;
  queueMinLimit: number;
  isMultiple: boolean;
  hasDescription: boolean;
  isDescriptionRequired: boolean;
  descRequiredMessage?: string;
  descPattern?: string = "";
  isRequired: boolean;
  isSigned: boolean = false;
  fileNamePattern?: string = "";
}
