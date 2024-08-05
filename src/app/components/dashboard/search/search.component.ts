import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';
import { UtilsService } from '../../../services/core/utils/utils.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  folderSelected: any;
  documentSelected: any;
  actionBtnIndexChanged: any;


  constructor(private router: Router, private filemanagerService: FilemanagerService, private utilsService: UtilsService) { }

  searchValue: string = '';
  show:boolean = true;
  sectionCourrierVisible:boolean = false;
  sectionExtensionVisible:boolean = false;
  sectionModeleVisible:boolean = false;
  visibleCustomerFields:boolean = false;
  page: number = 1;

  parsedId: number ;
  folders: any[];
  foldersFiles: any[];
  documents: any[];
  perPage: number = 20
  totalItems: number = 0;
  checkedItems: { [key: string]: boolean } = {};

  isLoading: boolean = false;
  setShowadvanseSearch(){
    
    if(this.show == false){
      this.show = true
    }else{

      this.show = false 
    }
  }

  onCheckboxChange(event: Event, key: string) {
    const isChecked = (event.target as HTMLInputElement).checked;
    switch (key) {
      case 'courriers':
        this.sectionCourrierVisible = isChecked;
        break;
      case 'documents':
        this.sectionExtensionVisible = isChecked;
        break;
      default:
        break;
    }
    this.checkedItems[key] = isChecked;

    console.log(this.checkedItems);




  }

  setVisibleCustomerFields(){
    this.visibleCustomerFields = !this.visibleCustomerFields
  }


  onSearch(page: number) {
    this.isLoading = true;
    this.router.navigate(['/tableau-de-bord/recherche/mot-cle',this.searchValue]);

    let formData = new FormData();
    formData.append('query', this.searchValue);
    formData.append('page', page.toString());
    formData.append('checkedItems', JSON.stringify(this.checkedItems));

    this.filemanagerService.searchInPageSearch(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.foldersFiles = res.results;
        this.isLoading = false;
        this.totalItems = res.count;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })


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
    this.page = event;
    // Vous pouvez également effectuer d'autres opérations liées au changement de page ici

    this.onSearch(event)
  }

}
