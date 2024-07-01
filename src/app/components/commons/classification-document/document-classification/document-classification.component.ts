import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilemanagerService } from '../../../../services/api/filemanager/filemanager.service';
import { UtilsService } from '../../../../services/core/utils/utils.service';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getFilesSelector, getFolderAndFilesResponse, getFolderAndFilesSuccess, getFoldersSelector, isLoadingGetFolderAndFiles, isLoadingSelectFile } from '../../../../state/selectors/numerical-deposit/numerical-deposite.selectors';
import { AppState } from '../../../../state/app.state';
import { getFolderAndFiles, sendFileFolderSelect } from '../../../../state/actions/numerical-deposit/numerical-deposite.actions';

@Component({
  selector: 'app-document-classification',
  templateUrl: './document-classification.component.html',
  styleUrl: './document-classification.component.css'
})
export class DocumentClassificationComponent  implements OnInit{
  isSpinnerLoading:boolean = false
  @Input() isOpenModal:boolean = false
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() folders:any[] = []
  @Input() documents:any[] = []
  selectedNodeId: number | null = null;
  @Input() documentId: string | null
  isLoading$: Observable<boolean>;
  isFolderLoading$: Observable<boolean>;
  getFileFolderSuccess$: Observable<boolean>;
  isMovefoldersFilesRequestLoading$: Observable<boolean>;
  isRoot:boolean = true
  error$: Observable<any>;
  response$: Observable<any>;
  isFolderRightSelect: number | null = null;

  folders$: Observable<any[]>;
  files$: Observable<any[]>;

  isLoadingFolderRight: boolean = false
// src/app/treeview/treeview.component.ts
treeData:any[] = [
  {
    id: 0,
    name: 'Root',
    children: [],
    loaded: false, // Indicateur pour vérifier si les enfants ont été chargés
    expanded: false // Indicateur pour vérifier si le dossier est ouvert
  }
];

    closeModal() {
      this.closeModalEvent.emit();
    }


  constructor(private fileManager: FilemanagerService,private cdr: ChangeDetectorRef,
    private utilsService: UtilsService,private store: Store<AppState>
    
    ) { 

      this.isLoading$ = this.store.select(isLoadingSelectFile);
      this.isFolderLoading$ = this.store.select(isLoadingGetFolderAndFiles);

      this.folders$ = this.store.select(getFoldersSelector);
      this.files$ = this.store.select(getFilesSelector);

      this.getFileFolderSuccess$ = this.store.select(getFolderAndFilesSuccess);

    }

    ngOnInit(): void {
      this.isLoading$.subscribe((isLoading) => {
        console.log('isLoading onInit ---- ',isLoading); // Devrait imprimer true ou false
      });

      this.isFolderLoading$.subscribe((isLoading) => {
        console.log('isLoading2 onInit ---- ',isLoading); // Devrait imprimer true ou false
      });


    }
  toggleNode(node: { loaded: boolean; id: any; children: any; expanded: boolean; }): void {


    if (!node.loaded) {
      this.fileManager.getFolderById(node.id,1).subscribe(response => {
        node.children = response.results.folders.map((folder: { id: any; name: any; }) => ({
          id: folder.id,
          name: folder.name,
          children: [],
          loaded: false,
          expanded: false
        }));
        node.loaded = true;
        node.expanded = !node.expanded; // Ouvrir le dossier après chargement
      });
    } else {
      node.expanded = !node.expanded; // Ouvrir/fermer le dossier si déjà chargé
    }
  }


  // Selectionner et disposer les fichiers sur la partie droite de l'interface
  selectNode(node: any): void {

    



    this.isLoadingFolderRight = true
    this.selectedNodeId = node.id;

    if(this.selectedNodeId){
/*       this.fileManager.getFolderById(this.selectedNodeId,1).subscribe({
        next: (response: any) => {
          this.isLoadingFolderRight = false;
          this.folders = response.results.folders
          this.documents = response.results.files
          this.isLoadingFolderRight = false

  
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {
          
          console.error('Erreur lors de la requête vers l\'API:', error);
          this.isLoadingFolderRight = false
          // Ajoutez ici la gestion des erreurs
        }
      }); */

      let formData = new FormData()
      formData.append('id', this.selectedNodeId.toString());
      formData.append('page', '1');
      this.store.dispatch(getFolderAndFiles({formData}));
    // Souscris au sélecteur de succès
    this.getFileFolderSuccess$.subscribe((isSuccess) => {
      if (isSuccess) {
        if (this.isRoot) {
          this.isRoot = false;
        }
      }
    });

      
  }
  
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

  classifyDocument(){
    alert(this.documentId)
    if(this.documentId && this.selectedNodeId){
      let formData = new FormData();
      formData.append('document_id', this.documentId);
      formData.append('type', "courrier");
      formData.append('folder_id', this.selectedNodeId.toString());
      
      this.store.dispatch(sendFileFolderSelect({ formData }));

    }

  }

}
