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

  // Function to handle file import
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

  // Function to convert Word file to HTML
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
}
