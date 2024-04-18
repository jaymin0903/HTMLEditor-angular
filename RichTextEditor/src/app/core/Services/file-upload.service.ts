import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  /**
   *
   * @param file a file of type .docx
   * @returns converted html string from the uploaded docx file
   */
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      responseType: 'text' as 'json',
    };

    return this.http.post<string>('/DocxToHtml/convert', formData, options);
    // return this.http.post<string>('/Docx/convert', formData, options);
  }

  /**
   *
   * @param fileContent html string to be saved in the DB
   * @returns a success or failure with an appropriate message
   */
  saveFile(fileContent: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
    const formData = new FormData();
    formData.append('htmlData', fileContent);

    return this.http.post<any>('/DocxToHtml/save', formData);
  }
}
