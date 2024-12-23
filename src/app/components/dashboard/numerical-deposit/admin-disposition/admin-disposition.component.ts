import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UserService } from '../../../../services/api/user/user.service';
import { UtilsService } from '../../../../services/core/utils/utils.service';
import { ContextMenuComponent } from '../../../commons/context-menu/context-menu/context-menu.component';

@Component({
  selector: 'app-admin-disposition',
  templateUrl: './admin-disposition.component.html',
  styleUrl: './admin-disposition.component.css'
})
export class AdminDispositionComponent {

  @ViewChild(ContextMenuComponent) contextMenu: ContextMenuComponent;

  @Input() disposition: string;
  @Input() parsedId: number ;
  @Input() folderName: string;
  @Input() folders: any[];
  @Input() foldersFiles: any[];
  @Input() documents: any[];
  @Input() perPage: number = 20
  @Input() totalItems: number = 0;
  @Input() isFilesLoading: boolean = true;
  @Input() page: number = 1
  @Input() activeActionBtnIndex: number;
  @Input() selectedCheckItems: any[] = []; // Ajout de la propriété selectedCheckItems
  @Output() folderSelected = new EventEmitter<{ id: number, name: string, page:number }>();
  @Output() renameModalEvent = new EventEmitter<{id:number, folderName:string}>();
  @Output() documentSelected = new EventEmitter<number>();
  @Output() checkboxChange = new EventEmitter<{ event: any, item: any }>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() actionBtnIndexChanged = new EventEmitter<number>();
  @Output() totalItemsChange = new EventEmitter<number>();
  isOpenModalRenameFolder:boolean = false
  constructor(private utilsService: UtilsService,) { }
  isSelected(item: any): boolean {
    return this.selectedCheckItems.some((i: { id: any; }) => i.id === item.id);
  }

  onCheckboxChange(event: any, item: any) {
    this.checkboxChange.emit({ event, item });
  }

  openFolderById(id: number, name: string,page:number) {
    this.folderSelected.emit({ id, name, page });
  }

  gotoDetailsDocument(id: number) {
    this.documentSelected.emit(id);
  }

  setActiveActionBtnIndex(index: number) {
    this.actionBtnIndexChanged.emit(index);
  }

  getIconName(extension: string){

    if(this.utilsService.isImageExtension(extension)){
      return "fa-solid fa-image"
    }
    if(this.utilsService.isVideoExtension(extension)){
      return "fa-solid fa-film"
    }
    if(extension == ".pdf"){
      return "fa-solid fa-file-pdf"
    }
    
    if(extension == ".docx"){
      return "fa-solid fa-file-word"
    }
    
    if(extension == ".xlsx"){
      return "fa-regular fa-file-excel"
    }
    
    if(extension == ".pdf"){
      return "fa-solid fa-file-pdf"
    }
    if(extension == ".zip"){
      return "fa-solid fa-file-zipper"
    }
    
    return "fa-solid fa-file"
  }

  getColor(extension: string){

    if(this.utilsService.isImageExtension(extension)){
      return "red"
    }
    if(this.utilsService.isVideoExtension(extension)){
      return "blue"
    }

    if(extension == ".pdf"){
      return "rgb(109, 0, 13)"
    }
    if(extension == ".docx"){
      return "#007abd"
    }
    if(extension == ".xlsx"){
      return "#00a006"
    }
    return "#bbb"
  }



 
  pageChanged(event: any) {
    // Logique pour gérer le changement de page
    this.page = event.page;
    this.pageChange.emit(event)
    // Vous pouvez également effectuer d'autres opérations liées au changement de page ici
  }

  selectedRowIndex: number | null = null;
  selectedRowType: string | null = null;

  isSingleSelected(itemId: number, itemType: string): boolean {
    return this.selectedRowIndex === itemId && this.selectedRowType === itemType;
  }
  
  onRightClick(event: MouseEvent, itemId: number, folderName: string, itemType: string): void {
    event.preventDefault();  // Empêche le menu contextuel par défaut
    this.selectedRowIndex = itemId;
    this.selectedRowType = itemType;
    this.folderName = folderName
    this.parsedId = itemId;
    this.contextMenu.onRightClick(event);
    console.log(`Ligne sélectionnée : ${itemId} de type ${itemType}`);
  }

  renameModal(id:number, folderName:string) {
    this.renameModalEvent.emit({id, folderName});
    this.setOpenRenameModal()
  }


  setOpenRenameModal(){
    this.isOpenModalRenameFolder = !this.isOpenModalRenameFolder
  
}

closeModalRenameFolder(){
  this.isOpenModalRenameFolder = false

}
}
