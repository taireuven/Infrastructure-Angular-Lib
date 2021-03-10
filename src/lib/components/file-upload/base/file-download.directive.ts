import { Directive, Input, HostListener } from '@angular/core';
import { FileService } from './file.service';

@Directive({
  selector: '[mohFileDownload]'
})
export class FileDownloadDirective {

  @Input() guid: string;

  constructor(private fileService: FileService) { }

  @HostListener('click', ['$event'])

  onClick() {
    if (this.guid && typeof this.guid == 'string') {
      //console.log('clicked ', this.guid);

      this.fileService.getFile(this.guid)
        .subscribe(
        response => this.downloadFile(response.fileContent, response.fileName),
        error => console.log(<any>error));


      //this.fileService.downloadSingleFile(this.fileName)
      //  .then((res: ng.IHttpPromiseCallbackArg<any>) => {

      //    //val = res.data.returnData;
      //    this.fileService.downloadByteArrayAsFile(res.data/*.returnData.fileStream*/, null, this.fileName);
      //  })
      //  .catch((ex: CoreModule.IResponse) => {
      //    this.modalService.error("אירעה שגיאה", ex.ClientMessage, "אישור");

      //  });

    }
    //else {
    //  alert('קובץ לא קיים');
    //}
  }

  downloadFile(base64String: any, fileName: string) {

    //let contentType = base64String.split(';')[0];

    let byteCharacters = atob(base64String);
    let byteNumbers = new Array(byteCharacters.length);

    for (var i = 0; i < byteCharacters.length; i++)
      byteNumbers[i] = byteCharacters.charCodeAt(i);

    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: 'application/octet-stream' });

    if (window.navigator.msSaveOrOpenBlob) {   //IE
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    }

    else { //CHROME
      var link = document.createElement('a');
      link.setAttribute("type", "hidden");
      link.download = fileName;
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
    }
  }
}
