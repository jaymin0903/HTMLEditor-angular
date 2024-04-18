import { Component, ElementRef, ViewChild } from '@angular/core';
import { FileUploadService } from '../core/Services/file-upload.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
})
export class TextEditorComponent {
  public editorData = '';
  public config = {};
  file: File | null = null;
  @ViewChild('tinyEditor') tinyEditor!: ElementRef;
  useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;
  constructor(private fileUploadService: FileUploadService) {
    this.config = {
      selector: 'textarea#open-source-plugins',
      plugins:
        'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
      editimage_cors_hosts: ['picsum.photos'],
      menubar: 'file edit view insert format tools table help',
      toolbar:
        'undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
      autosave_ask_before_unload: true,
      autosave_interval: '30s',
      autosave_prefix: '{path}{query}-{id}-',
      autosave_restore_when_empty: false,
      autosave_retention: '2m',
      image_advtab: true,
      link_list: [
        { title: 'My page 1', value: 'https://www.tiny.cloud' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' },
      ],
      image_list: [
        { title: 'My page 1', value: 'https://www.tiny.cloud' },
        { title: 'My page 2', value: 'http://www.moxiecode.com' },
      ],
      image_class_list: [
        { title: 'None', value: '' },
        { title: 'Some class', value: 'class-name' },
      ],
      importcss_append: true,
      file_picker_callback: (
        callback: (
          arg0: string,
          arg1: {
            text?: string;
            alt?: string;
            source2?: string;
            poster?: string;
          }
        ) => void,
        value: any,
        meta: { [x: string]: string }
      ) => {
        /* Provide file and text for the link dialog */
        if (meta['filetype'] === 'file') {
          callback('https://www.google.com/logos/google.jpg', {
            text: 'My text',
          });
        }

        /* Provide image and alt text for the image dialog */
        if (meta['filetype'] === 'image') {
          callback('https://www.google.com/logos/google.jpg', {
            alt: 'My alt text',
          });
        }

        /* Provide alternative source and posted for the media dialog */
        if (meta['filetype'] === 'media') {
          callback('movie.mp4', {
            source2: 'alt.ogg',
            poster: 'https://www.google.com/logos/google.jpg',
          });
        }
      },
      height: 600,
      image_caption: true,
      quickbars_selection_toolbar:
        'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
      noneditable_class: 'mceNonEditable',
      toolbar_mode: 'sliding',
      contextmenu: 'link image table',
      skin: this.useDarkMode ? 'oxide-dark' : 'oxide',
      content_css: this.useDarkMode ? 'dark' : 'default',
      content_style:
        'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
    };
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
