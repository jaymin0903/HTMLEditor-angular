import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const options = {
      responseType: 'text' as 'json',
    };

    return this.http.post<string>('/DocxToHtml/convert', formData, options);
    // return this.http.post<string>('/Docx/convert', formData, options);
  }
}
