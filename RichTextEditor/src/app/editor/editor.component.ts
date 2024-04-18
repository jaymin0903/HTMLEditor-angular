import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUploadService } from '../core/Services/file-upload.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  public Editor = ClassicEditor;
  public editorData = '';
  file: File | null = null;

  constructor(private fileUploadService: FileUploadService) {}

  /**
   * @description Function to handle file import
   */
  onFileChange(event: any) {
    debugger;
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        this.convertWordToHtml();
      };
      reader.readAsArrayBuffer(this.file);
    }
  }

  /**
   * @description Function to convert Word file to HTML
   */
  convertWordToHtml() {
    if (this.file) {
      this.fileUploadService.uploadFile(this.file).subscribe({
        next: (htmlContent: string) => {
          debugger;
          this.editorData = htmlContent;
        },
        error: (err) => {
          console.log('err => ', err);
        },
      });
    }
  }

  /**
   * @description Saves editor content to the DB
   */
  saveFileContent() {
    if (this.editorData) {
      this.fileUploadService.saveFile(this.editorData).subscribe({
        next: (response) => {
          console.log('response => ', response);
        },
        error: (err) => {
          console.log('err => ', err);
        },
      });
    }
  }
}
