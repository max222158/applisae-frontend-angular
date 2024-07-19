import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-group-users',
  templateUrl: './modal-group-users.component.html',
  styleUrl: './modal-group-users.component.css'
})
export class ModalGroupUsersComponent {
  @Input() isOpenModalGroupUser: boolean = true;
  @Input() current_folder_name: string;
  @Input() multiple_selection: boolean=true;
  @Input() number_of_elements: number = 0;
  @Input() groupUser: any[] = [];
  @Input() paths: any[] = [];
  @Input()  selectedIds: number[] = [];
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() selectId = new EventEmitter<number>();
  @Output() searchEvent = new EventEmitter<void>();
  @Output() getUsersEvent = new EventEmitter<void>();
  @Output() setFolderId = new EventEmitter<{id: number, name: string, searchText: string}>();
  @Output() groupSelectChange = new EventEmitter<any[]>();
  searchText:string = ''
  private _groupSelect: any[] = [];

  @Input() set groupSelect(value: any[]) {
    this._groupSelect = value;
    this.selectedIds = this._groupSelect.map(user => user.id);
  }

  get groupSelect(): any[] {
    return this._groupSelect;
  }
  closeModal() {
    this.closeModalEvent.emit();
  }

  search(value:string) {
    this.searchEvent.emit();
  }

  getUsers() {
    this.getUsersEvent.emit();
  }

  isSelectionFolder = -1;

  setIsSelectionFolder(i: number,id: number) {
    this.isSelectionFolder = i;
    this.selectId.emit(id)


  }

  getFolderById(id: number, name: string, searchText:string) {
    this.isSelectionFolder = -1;
    this.setFolderId.emit({id, name, searchText});
  }

  getFolderByPathId(id: number, name: string,searchText:string) {
    this.isSelectionFolder = -1;
    this.setFolderId.emit({id, name,searchText});
  }

  getPathFolder(id: number, name: string,searchText:string) {
    this.isSelectionFolder = -1;
    this.setFolderId.emit({id, name, searchText});
  }

  toggleSelection(id: number, name: string) {
    const isSelected = this.selectedIds.includes(id);
    if(this.multiple_selection){

      if (isSelected) {
        this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
        this.groupSelect = this.groupSelect.filter(item => item.id !== id);
      } else {
        this.selectedIds.push(id);
        this.groupSelect.push({ id: id, name: name })
      }

    }else{

      this.selectedIds=[]
      this.groupSelect=[]

      if (isSelected) {
        this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
        this.groupSelect = this.groupSelect.filter(item => item.id !== id);
      } else {
        this.selectedIds.push(id);
        this.groupSelect.push({ id: id, name: name })
      }


    }


    console.log("--------eterretet---------",this.groupSelect)
    this.groupSelectChange.emit(this.groupSelect);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }
  currentPage = 1;
  query=""
  onSearch(): void {
    this.currentPage = 1;  // Reset to first page on new search
    this.getUsers();
  }

  onInputChange(event: any): void {
    this.query = event.target.value;

  }
}
