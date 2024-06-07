import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.css'
})
export class ModalDeleteComponent {
  @Input() isOpenModalDelete: boolean = false;
  @Input() number_of_elements: number = 0;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() deleteFileEvent = new EventEmitter<void>();


  closeModal() {
    this.closeModalEvent.emit();
  }

  deleteFile() {
    this.deleteFileEvent.emit();
  }




}
