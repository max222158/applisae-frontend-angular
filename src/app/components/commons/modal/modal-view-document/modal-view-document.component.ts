import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-view-document',
  templateUrl: './modal-view-document.component.html',
  styleUrl: './modal-view-document.component.css'
})
export class ModalViewDocumentComponent {
  @Input() isOpenModal: boolean = false;
  @Input() pdfSrc:string = ''
  @Input() zoom:number = 0.9 
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() setPdfSrcEvent = new EventEmitter<void>();



  closeModal() {
    this.closeModalEvent.emit();
  }
  setPdfSrc() {
    this.setPdfSrcEvent.emit();
  }

  setZoom(action: string) {
    if (action == "reduce") {
      this.zoom = this.zoom - 0.1
    } else {
      this.zoom = this.zoom + 0.1
    }


  }

}
