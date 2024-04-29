import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadService } from '../core/Services/file-upload.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent implements AfterViewInit {
  public editorData = '';
  file: File | null = null;
  @ViewChild('tinyEditor') tinyEditor!: ElementRef;
  useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

  constructor(
    private fileUploadService: FileUploadService,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    const promotionDiv =
      this.elementRef.nativeElement.querySelector('.tox-promotion');
    console.log('promotionDiv => ', this.elementRef);
    if (promotionDiv) promotionDiv.style.display = 'none';
  }

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
        0;
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
