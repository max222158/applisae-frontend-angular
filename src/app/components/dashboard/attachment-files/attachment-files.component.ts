import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-attachment-files',
  templateUrl: './attachment-files.component.html',
  styleUrl: './attachment-files.component.css'
})
export class AttachmentFilesComponent {

  selectedAttachmentFiles: File[] = [];

  @Output() filesSelected = new EventEmitter<File[]>();

  onFileAttachmentSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedAttachmentFiles.push(files[i]);
    }
    this.filesSelected.emit(this.selectedAttachmentFiles);
  }

  removeFileAttachment(file: File): void {
    const index = this.selectedAttachmentFiles.indexOf(file);
    if (index > -1) {
      this.selectedAttachmentFiles.splice(index, 1);
    }
    this.filesSelected.emit(this.selectedAttachmentFiles);
  }
  
  resetAttachment(): void {
    this.selectedAttachmentFiles = []
  }

}

