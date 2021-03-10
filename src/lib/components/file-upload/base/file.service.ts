import { Injectable, Inject } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MohHttpClient} from '../../../services/http/http-client';
import { ConfigService } from '../../../services/config/config.service';

@Injectable()
export class FileService {
  private _url = "/api/FileUpload/Download/";

  constructor(private _http: MohHttpClient, private configService: ConfigService) {//@Inject('env') private environment
    this._url = configService.baseConfiguration.servicesApiURL + this._url; 
  }

  getExtensions(): Observable<any> {
    return this._http.get("/assets/data/file-extensions.json").pipe(
      map((response: any) => {
        return response;
      }));
  }

  getFile(guid: string): Observable<any> {
    return this._http.get(this._url + guid ).pipe(//
      //.map((response: any) => ((response) => (<Response>response).blob()))
      //.map((response: Response) => <any>response.json())
      map(res => <any>res),
      catchError(this.handleError));
  }

  private handleError(error: Response) {
    return throwError(error.statusText);
  }

  //downloadSingleFile(fileName: any): ng.IHttpPromise<ResponseFile> {
  //  return this.$http.get(this.urlConfig.BaseWebApi + "/api/FileUpload/Download?fileName=" + fileName, { responseType: 'arraybuffer' })
  //};



  //downloadByteArrayAsFile(data: any, contentType: any, fileName: string) {
  //  var blob = new Blob([data], { type: 'application/octet-stream' });
  //  try {
  //    var a = window.document.createElement('a');

  //    a.href = window.URL.createObjectURL(blob);
  //    a.download = fileName;

  //    // Append anchor to body.
  //    document.body.appendChild(a)
  //    a.click();

  //    // Remove anchor from body
  //    document.body.removeChild(a)
  //  }
  //  catch (e) {
  //    let link = document.createElement('a');
  //    if ('download' in link) {
  //      try {
  //        let url = URL.createObjectURL(blob);
  //        link.setAttribute('href', url);

  //        // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
  //        link.setAttribute("download", fileName);

  //        // Simulate clicking the download link
  //        var event = document.createEvent('MouseEvents');
  //        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  //        link.dispatchEvent(event);
  //      }
  //      catch (ex) {
  //        console.log(ex);
  //      }
  //    }
  //    else {
  //      window.navigator.msSaveOrOpenBlob(blob, fileName);

  //    }
  //  }
  //}
}
