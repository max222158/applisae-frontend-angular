
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrl: './modal-users.component.css'
  
})
export class ModalUsersComponent {
  @Input() isOpenModalUser: boolean = true;
  @Input() current_folder_name: string;
  @Input() query: string = '';
  @Input() number_of_elements: number = 0;
  @Input() users: any[] = [];
  @Input() paths: any[] = [];
  @Input()  selectedIds: number[] = [];
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() selectId = new EventEmitter<number>();
  @Output() searchEvent = new EventEmitter<string>();
  @Output() getUsersEvent = new EventEmitter<void>();
  @Output() setFolderId = new EventEmitter<{id: number, name: string}>();
  @Output() usersSelectChange = new EventEmitter<any[]>();
  @Output() inputQueryValueChange: EventEmitter<string> = new EventEmitter<string>();

  
  private _usersSelect: any[] = [];

  @Input() set usersSelect(value: any[]) {
    this._usersSelect = value;
    this.selectedIds = this._usersSelect.map(user => user.id);
  }

  get usersSelect(): any[] {
    return this._usersSelect;
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


  onInputValueChange() {
    this.inputQueryValueChange.emit(this.query);
  }


  toggleSelection(id: number, name: string) {
    const isSelected = this.selectedIds.includes(id);
    if (isSelected) {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
      this.usersSelect = this.usersSelect.filter(item => item.id !== id);
    } else {
      this.selectedIds.push(id);
      this.usersSelect.push({ id: id, name: name })
    }

    console.log("--------eterretet---------",this.usersSelect)
    this.usersSelectChange.emit(this.usersSelect);
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }
  currentPage = 1;


  onInputChange(event: any): void {
    this.query = event.target.value;

  }
  

}
