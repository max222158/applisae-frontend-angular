import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-copy',
  templateUrl: './modal-copy.component.html',
  styleUrls: ['./modal-copy.component.css']
})
export class ModalCopyComponent {
  @Input() isOpenModalCopy: boolean = false;
  @Input() current_folder_name: string;
  @Input() number_of_elements: number = 0;
  @Input() folders: any[] = [];
  @Input() paths: any[] = [];
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() selectId = new EventEmitter<number>();
  @Output() copyFileEvent = new EventEmitter<void>();
  @Output() setFolderId = new EventEmitter<{id: number, name: string}>();

  closeModal() {
    this.closeModalEvent.emit();
  }

  copyFile() {
    this.copyFileEvent.emit();
  }

  isSelectionFolder = -1;

  setIsSelectionFolder(i: number,id: number) {
    this.isSelectionFolder = i;
    this.selectId.emit(id)


  }

  getFolderById(id: number, name: string) {
    this.isSelectionFolder = -1;
    this.setFolderId.emit({id, name});
  }

  getFolderByPathId(id: number, name: string) {
    this.isSelectionFolder = -1;
    this.setFolderId.emit({id, name});
  }

  getPathFolder(id: number, name: string) {
    this.isSelectionFolder = -1;
    this.setFolderId.emit({id, name});
  }
}
