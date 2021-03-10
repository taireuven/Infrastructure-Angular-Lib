export class UploadEntity {
  filesDetails: FileDetails[];
  fileDescription: string;
}

export class FileDetails {
  fileGuid: string;
  fileName: string;
  fileSize: string;
  constructor(fileGuid: string, fileName: string, fileSize: string) {
    this.fileGuid = fileGuid;
    this.fileName = fileName;
    this.fileSize = fileSize;
  }
}
