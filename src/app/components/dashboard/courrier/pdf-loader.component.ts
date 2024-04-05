import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-preview',
  template: `
    <input type="file" (change)="handleFileInput($event)">
    <ngx-extended-pdf-viewer [src]="pdfSrc" height="600px"></ngx-extended-pdf-viewer>
    
  `,
  styles: []
})
export class PdfPreviewComponent {
  pdfSrc: string | ArrayBuffer = '';

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.pdfSrc = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsArrayBuffer(file);
    }
  }
}
