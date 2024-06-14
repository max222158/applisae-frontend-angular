import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-add-new-version-document',
  templateUrl: './add-new-version-document.component.html',
  styleUrl: './add-new-version-document.component.css'
})
export class AddNewVersionDocumentComponent {
  constructor( private wordToPdfService: ApiService) { }

  @Input() isOpenModal:boolean = false
  @Output() saveVersionEvent = new EventEmitter<{ selectedFile:  File | null , description: string }>();
  @Input() notifySuccessSaveVersion: string;
  pdfSrc: SafeResourceUrl | string | Uint8Array   = '';
  array_buffer_pdfsrc: ArrayBuffer

  extension: string = ''
  @Input() versionNumber:number = 10
  description: string = ''
  selectedAttachmentFiles :File[] = [];
  selectedFile: File | null = null;
  isFileLoading:boolean = false
  isSpinnerLoading:boolean = false
  disabled:boolean = true

  @Output() closeModalEvent = new EventEmitter<void>();

    closeModal() {
      this.closeModalEvent.emit();
    }

    getIterable(n: number): number[] {
      return Array.from({ length: n }, (_, i) => i + 1);
    }

    onFileSelected(event: Event) {

      let fileInput = event.target as HTMLInputElement;
      let reader = new FileReader(); // Suggestion 1

      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        this.disabled=false
        let file = fileInput.files[0]; // Suggestion 2
        this.selectedFile = fileInput.files[0]
         console.log(fileInput.files[0]) 
        if (!this.isPdfFile(file)) {

          this.wordToPdfService.convertWordToPdf(file).subscribe(
            (pdfBlob: any) => {
              this.extension = '.docx';
              let binary_string = window.atob(pdfBlob.pdf_base64);
              let len = binary_string.length;
              let bytes = new Uint8Array(len);
              for (let i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
              }

              this.pdfSrc = bytes.buffer;
              this.isFileLoading = false;

            },
            error => {
              console.error('Erreur lors de la conversion :', error);
              this.isFileLoading = false;
            }
          );

        }

        if (this.isPdfFile(file)) {
          let $pdf: any = document.querySelector('#file');

          if (typeof (FileReader) !== 'undefined') {
            reader.onload = (e: any) => {
              this.pdfSrc = e.target.result;
              this.isFileLoading = false;
            };

            reader.readAsArrayBuffer($pdf.files[0]);
          }

        }
        
      } else {

        this.isFileLoading = false;
        this.disabled = true;
        this.selectedFile = null;
        this.disabled=true

      }

    }

    isPdfFile(file: File): boolean {
      return file.name.toLowerCase().endsWith('.pdf');
    }
    isOfficeFile(file: File): boolean {
      return file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.xlsx');
    }


    
  saveVersion() {
    this.isSpinnerLoading = true
    this.disabled = true
    console.log(this.selectedFile)
    this.saveVersionEvent.emit({ description: this.description, selectedFile: this.selectedFile });

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['notifySuccessSaveVersion']) {
      this.onParentFunctionExecuted();
    }
  }

  onParentFunctionExecuted() {
    this.disabled = true
    this.isSpinnerLoading = false
    console.log('Parent function executed. Data received:', this.notifySuccessSaveVersion);
  }
  
  
}
