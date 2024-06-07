import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../../../services/core/utils/utils.service';

@Component({
  selector: 'app-user-disposition',
  templateUrl: './user-disposition.component.html',
  styleUrl: './user-disposition.component.css'
})
export class UserDispositionComponent {
  @Input() disposition: string;
  @Input() folders: any[];
  @Input() documents: any[];
  @Input() activeActionBtnIndex: number;
  @Input() selectedCheckItems: any[] = []; // Ajout de la propriété selectedCheckItems
  @Output() folderSelected = new EventEmitter<{ id: number, name: string }>();
  @Output() documentSelected = new EventEmitter<number>();
  @Output() checkboxChange = new EventEmitter<{ event: any, item: any }>();
  @Output() actionBtnIndexChanged = new EventEmitter<number>();

  constructor(private utilsService: UtilsService,) { }

  isSelected(item: any): boolean {
    return this.selectedCheckItems.some((i: { id: any; }) => i.id === item.id);
  }

  onCheckboxChange(event: any, item: any) {
    this.checkboxChange.emit({ event, item });
  }

  openFolderById(id: number, name: string) {
    this.folderSelected.emit({ id, name });
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
}
