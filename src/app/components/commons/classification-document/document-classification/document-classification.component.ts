import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilemanagerService } from '../../../../services/api/filemanager/filemanager.service';
import { UtilsService } from '../../../../services/core/utils/utils.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { copyFolderAndFilesResponse, getFilesSelector, getFolderAndFilesSuccess, getFoldersSelector, getPathSelector, isCopyFolderAndFilesSuccess, isLoadingCopyFolderAndFiles, isLoadingGetFolderAndFiles, isLoadingMoveFolderAndFiles, isLoadingSelectFile, moveFolderAndFilesResponse, moveFolderAndFilesSuccess, sendFileFolderSelectSuccess } from '../../../../state/selectors/numerical-deposit/numerical-deposite.selectors';
import { copyFolderAndFiles, getFolderAndFiles, moveFolderAndFiles, resetFolderAndFiles, resetIsSuccessCopyState, resetIsSuccessMoveState, sendFileFolderSelect } from '../../../../state/actions/numerical-deposit/numerical-deposite.actions';

@Component({
  selector: 'app-document-classification',
  templateUrl: './document-classification.component.html',
  styleUrl: './document-classification.component.css'
})
export class DocumentClassificationComponent {
  isSpinnerLoading: boolean = false
  @Input() isOpenModal: boolean = false
  disabledActionButton: boolean = false
  @Input() number_of_elements: number = 0;

  @Input() modalTitle: string = ''
  @Input() modalButtonAction: string = ''
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() folders: any[] = []
  @Input() documents: any[] = []
  selectedNodeId: number | null = null;
  @Input() documentId: string | null
  isLoading$: Observable<boolean>;
  isFolderLoading$: Observable<boolean>;
  isActionMoveSuccess$: Observable<any>;
  isCopySuccess$: Observable<any>;
  isMovefoldersFilesRequestLoading$: Observable<boolean>;
  isCopyfoldersFilesRequestLoading$: Observable<boolean>;
  getFileFolderSuccess$: Observable<boolean>;
  isRoot: boolean = true
  error$: Observable<any>;
  response$: Observable<any>;
  isFolderRightSelect: number | null = null;
  searchText:string = ''
  folders$: Observable<any[]>;
  files$: Observable<any[]>;
  paths$: Observable<any[]>;
  sendFileFolderSelectSuccess$: Observable<boolean>;

  isLoadingFolderRight: boolean = false
  isOpenModalFolder:boolean = false
  private subscriptions: Subscription = new Subscription();
  @Input() selectedFolders: any[] = [];
  @Input() paths: any[] = [];
  @Output() selectId = new EventEmitter<number>();
  @Output() copyFileEvent = new EventEmitter<void>();
  @Output() setFolderId = new EventEmitter<{ id: number, name: string }>();
  // src/app/treeview/treeview.component.ts
  treeData: any[] = [
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


  constructor(private fileManager: FilemanagerService, private cdr: ChangeDetectorRef,
    private utilsService: UtilsService, private store: Store<AppState>

  ) {

    this.isLoading$ = this.store.select(isLoadingSelectFile);
    this.isFolderLoading$ = this.store.select(isLoadingGetFolderAndFiles);

    this.isMovefoldersFilesRequestLoading$ = this.store.select(isLoadingMoveFolderAndFiles);

    this.isCopyfoldersFilesRequestLoading$ = this.store.select(isLoadingCopyFolderAndFiles);


    this.folders$ = this.store.select(getFoldersSelector);
    this.paths$ = this.store.select(getPathSelector);
    this.files$ = this.store.select(getFilesSelector);

    this.getFileFolderSuccess$ = this.store.select(getFolderAndFilesSuccess);
    
    this.isActionMoveSuccess$ = this.store.select(moveFolderAndFilesSuccess);
    this.isCopySuccess$ = this.store.select(isCopyFolderAndFilesSuccess);
    this.sendFileFolderSelectSuccess$ = this.store.select(sendFileFolderSelectSuccess)

  }

  ngOnInit(): void {

    //  subscription const subscription2 empeche le 
    //  state dêtre appelé plusieurs fois
    const subscription3 = this.isLoading$.subscribe((isLoading) => {
      console.log('isLoading ngOnInit ---- ', isLoading); // Devrait imprimer true ou false
    });

    const subscription4 = this.isFolderLoading$.subscribe((isLoading) => {
      console.log('isLoading2 ngOnInit ---- ', isLoading); // Devrait imprimer true ou false
    });



     const subscription2 = this.isActionMoveSuccess$.subscribe((action) => {
      console.log('is action success ---- ', action); // Devrait imprimer true ou false
      if (action == true) {
        this.restartFolder()
      }else if(action == false){
  
        this.store.dispatch(resetIsSuccessMoveState());

      }

    }); 


    const subscription5 = this.sendFileFolderSelectSuccess$.subscribe((success) => {
      console.log('sendFileFolderSelectSuccess ---- ', success); // Devrait imprimer true ou false
      if (success == true) {
        let formData = new FormData()
        if(this.selectedNodeId){
          formData.append('id', this.selectedNodeId.toString());
          formData.append('page', '1');
          this.store.dispatch(getFolderAndFiles({ formData }));
        }
      }else if(success == false){
        this.disabledActionButton = false
        this.store.dispatch(resetIsSuccessMoveState());

      }

    }); 

    


    const subscription1 = this.isCopySuccess$.subscribe(action => {
      if (action == true) {

        
      let formData = new FormData()
      if(this.selectedNodeId){
        formData.append('id', this.selectedNodeId.toString());
        formData.append('page', '1');
        this.store.dispatch(getFolderAndFiles({ formData }));
      }


      }else if(action == false){
        this.disabledActionButton = false
        this.store.dispatch(resetIsSuccessCopyState());

      }
    });



    this.subscriptions.add(subscription1);
    this.subscriptions.add(subscription2);
    this.subscriptions.add(subscription3);
    this.subscriptions.add(subscription4);
    this.subscriptions.add(subscription5);


  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
    this.store.dispatch(resetFolderAndFiles());
    // Reset the copy state when the component is destroyed
  }
  toggleNode(node: { loaded: boolean; id: any; children: any; expanded: boolean; }): void {


    if (!node.loaded) {
      this.fileManager.getFolderById(node.id, 1,this.searchText).subscribe(response => {
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



    this.disabledActionButton = false

    this.isLoadingFolderRight = true
    this.selectedNodeId = node.id;

    if (this.selectedNodeId) {

      let formData = new FormData()
      formData.append('id', this.selectedNodeId.toString());
      formData.append('page', '1');
      this.store.dispatch(getFolderAndFiles({ formData }));
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


  getIconName(extension: string) {

    if (this.utilsService.isImageExtension(extension)) {
      return "fa-solid fa-image"
    }
    if (this.utilsService.isVideoExtension(extension)) {
      return "fa-solid fa-film"
    }
    if (extension == ".pdf") {
      return "fa-solid fa-file-pdf"
    }

    if (extension == ".docx") {
      return "fa-solid fa-file-word"
    }

    if (extension == ".xlsx") {
      return "fa-regular fa-file-excel"
    }

    if (extension == ".pdf") {
      return "fa-solid fa-file-pdf"
    }
    if (extension == ".zip") {
      return "fa-solid fa-file-zipper"
    }

    return "fa-solid fa-file"
  }

  getColor(extension: string) {

    if (this.utilsService.isImageExtension(extension)) {
      return "red"
    }
    if (this.utilsService.isVideoExtension(extension)) {
      return "blue"
    }

    if (extension == ".pdf") {
      return "rgb(109, 0, 13)"
    }
    if (extension == ".docx") {
      return "#007abd"
    }
    if (extension == ".xlsx") {
      return "#00a006"
    }
    return "#bbb"
  }
  classifyDocument(){
    alert(this.documentId)
    if(this.documentId && this.selectedNodeId){
      this.disabledActionButton = true
      let formData = new FormData();
      formData.append('document_id', this.documentId);
      formData.append('type', "courrier");
      formData.append('folder_id', this.selectedNodeId.toString());
      
      this.store.dispatch(sendFileFolderSelect({ formData }));

    }

  }

  restartFolder() {
    this.disabledActionButton = true
    this.isRoot = true;
    this.toggleNode({ loaded: true, id: 0, children: [], expanded: true })
    this.selectedNodeId = -1
    this.treeData = [
      {
        id: 0,
        name: 'Root',
        children: [],
        loaded: false, // Indicateur pour vérifier si les enfants ont été chargés
        expanded: false // Indicateur pour vérifier si le dossier est ouvert
      }
    ];
  }

  openModalFolder(){
    this.isOpenModalFolder = true
  }

  closeModalFolder(){
    this.isOpenModalFolder = true
  }
}
