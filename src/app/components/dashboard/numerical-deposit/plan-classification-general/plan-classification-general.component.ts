import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FilemanagerService } from '../../../../services/api/filemanager/filemanager.service';
import { UtilsService } from '../../../../services/core/utils/utils.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { copyFolderAndFilesResponse, getFilesSelector, getFolderAndFilesResponse, getFolderAndFilesSuccess, getFoldersSelector, getPathSelector, isCopyFolderAndFilesSuccess, isLoadingCopyFolderAndFiles, isLoadingGetFolderAndFiles, isLoadingMoveFolderAndFiles, isLoadingSelectFile, moveFolderAndFilesResponse, moveFolderAndFilesSuccess, sendFileFolderSelectSuccess, totalItemsFoldersFiles } from '../../../../state/selectors/numerical-deposit/numerical-deposite.selectors';
import { copyFolderAndFiles, getFolderAndFiles, moveFolderAndFiles, resetFolderAndFiles, resetIsSuccessCopyState, resetIsSuccessMoveState, sendFileFolderSelect } from '../../../../state/actions/numerical-deposit/numerical-deposite.actions';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-classification-general',
  templateUrl: './plan-classification-general.component.html',
  styleUrl: './plan-classification-general.component.css'
})
export class PlanClassificationGeneralComponent {
  isSpinnerLoading: boolean = false
  @Input() isOpenModal: boolean = false
  disabledActionButton: boolean = false
  @Input() number_of_elements: number = 0;
  perPage:number =  10
  page:number = 1
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
  isOpenModalFolder:boolean = false
  folders$: Observable<any[]>;
  files$: Observable<any[]>;
  paths$: Observable<any[]>;
  sendFileFolderSelectSuccess$: Observable<boolean>;
  selectedCheckItems:any[]=[]
  isLoadingFolderRight: boolean = false
  isOpenModalDelete:boolean = false
  isLoading:boolean = false
  isActionMoving:boolean = false // lorsqu'on selectionne des fichier et dossiers pour les déplacer
  isModalReadSingle:boolean = false
  extension:string = ''
  fileName:string = ''
  documentIdView:number
  private subscriptions: Subscription = new Subscription();
  @Input() selectedFolders: any[] = [];
  @Input() paths: any[] = [];
  folderPaths: any[] = [];
  @Output() selectId = new EventEmitter<number>();
  @Output() copyFileEvent = new EventEmitter<void>();
  @Output() setFolderId = new EventEmitter<{ id: number, name: string }>();
  folderAndFilesResponse$: Observable<any[]>;
  totalItems:number = 0
  totalItems$: Observable<number>
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

  closeModalReaderDocument(){
    this.isModalReadSingle = false
  }

  closeModalDelete() {
    this.isOpenModalDelete = false;
  }


  constructor(private fileManager: FilemanagerService, private cdr: ChangeDetectorRef,
    private utilsService: UtilsService, private store: Store<AppState>,private toastr:ToastrService

  ) {

    this.isLoading$ = this.store.select(isLoadingSelectFile);
    this.isFolderLoading$ = this.store.select(isLoadingGetFolderAndFiles);

    this.isMovefoldersFilesRequestLoading$ = this.store.select(isLoadingMoveFolderAndFiles);

    this.isCopyfoldersFilesRequestLoading$ = this.store.select(isLoadingCopyFolderAndFiles);
    this.folderAndFilesResponse$ = this.store.select(getFolderAndFilesResponse);

    this.folders$ = this.store.select(getFoldersSelector);
    this.paths$ = this.store.select(getPathSelector);
    this.files$ = this.store.select(getFilesSelector);

    this.getFileFolderSuccess$ = this.store.select(getFolderAndFilesSuccess);
    
    this.isActionMoveSuccess$ = this.store.select(moveFolderAndFilesSuccess);
    this.isCopySuccess$ = this.store.select(isCopyFolderAndFilesSuccess);
    this.sendFileFolderSelectSuccess$ = this.store.select(sendFileFolderSelectSuccess)
    this.totalItems$ = this.store.select(totalItemsFoldersFiles);
    

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
        let formData = new FormData()
        if(this.selectedNodeId){
            formData.append('id', this.selectedNodeId.toString());
            formData.append('page', '1');
        }
        this.store.dispatch(getFolderAndFiles({ formData }));
        this.isActionMoving = false
      }else if(action == false){
  
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

    const subscription6 = this.paths$.subscribe((folderPaths) => {
      console.log('folderPaths ---- ', folderPaths);
      this.folderPaths = folderPaths
    });

    const subscription7 = this.totalItems$.subscribe((response) => {

      console.log("totalItemsFoldersFiles ", response )
      this.totalItems = response

    });

    this.subscriptions.add(subscription7);

  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
    this.store.dispatch(resetFolderAndFiles());
    // Reset the copy state when the component is destroyed
  }
  refreshFolderById(){
              
    let formData = new FormData()
    if(this.selectedNodeId){
      formData.append('id', this.selectedNodeId.toString());
      formData.append('page', '1');
      this.store.dispatch(getFolderAndFiles({ formData }));
    }
  }

  // 1er click du dossier root 
  //et pour disposer les sous dossiers du treeview
  toggleNode(node: { loaded: boolean; id: any; children: any; expanded: boolean; }): void {

    if (!node.loaded) {

      this.getFolderTreeView(1,node)

 
    } else {
      node.expanded = !node.expanded; // Ouvrir/fermer le dossier si déjà chargé
    }
  }


  getFolderTreeView(page:number,node:any){


    let formData = new FormData()
    formData.append('id', node.id.toString());
    formData.append('page', page.toString());
    this.fileManager.getOnlyFolders(formData).subscribe({
      next:(response) => {
        node.children = response.folders.map((folder: { id: any; name: any; }) => ({
          id: folder.id,
          name: folder.name,
          children: [],
          loaded: false,
          expanded: false
        }));
        node.loaded = true;
        node.expanded = !node.expanded;

      },
      error:() => {

      }
    })

  }

  // Selectionner et disposer les fichiers sur la partie droite de l'interface
  selectNode(node: any, page:number): void {



    this.disabledActionButton = false

    this.isLoadingFolderRight = true
    this.selectedNodeId = node.id;
    this.page = 1
    if (this.selectedNodeId) {

      let formData = new FormData()
      formData.append('id', this.selectedNodeId.toString());
      formData.append('page', page.toString());
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



  openModalFolder(){
    
    this.isOpenModalFolder = true
  }

  openModalDelete(){
    
    this.isOpenModalDelete = true
  }

  closeModalFolder(){
    this.isOpenModalFolder = false
  }


  onCheckboxChange(event: any, item: any) {
    if (event.target.checked) {
      this.selectedCheckItems.push(item);
    } else {
      this.selectedCheckItems = this.selectedCheckItems.filter((i: { id: any; }) => i.id !== item.id);
      
    }
   
    console.log(this.selectedCheckItems)
  }

  setIsActionMovingState(value:boolean){

    this.isActionMoving = value

  }
  moveAction(){
    if (this.selectedNodeId) {
      this.isActionMoving = true
      console.log(this.selectedFolders)
      const formData = new FormData();
      formData.append('folders_files', JSON.stringify(this.selectedCheckItems));
      formData.append('folder_id', this.selectedNodeId.toString());
      this.store.dispatch(moveFolderAndFiles({ formData }));


    }
  }

  deleteFolderFile(){
    const formData = new FormData();
    formData.append('folders_files', JSON.stringify(this.selectedCheckItems));

    this.fileManager.deleteFileFolder(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        this.toastr.success('Effectué avec succès!','Opération');
        console.log('Réponse de l\'API:', response);
        this.closeModalDelete()

        this.refreshFolderById()
        //this.refreshCurrentFolder(this.folder_id,this.current_folder_name)
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error( 'Lors de la suppression! Veuillez réésayer','Erreur');
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });  
  }

  openModalReadSingle(extension:string,id:number,name:string){
    this.extension = extension
    this.documentIdView = id
    this.isModalReadSingle = true
    this.fileName = name
  }


  
  pageChanged(event:any){
    this.page = event
    alert(this.page)
    let formData = new FormData()
    if(this.selectedNodeId){
      formData.append('id', this.selectedNodeId.toString());
      formData.append('page', event);
    }

    this.store.dispatch(getFolderAndFiles({ formData }));

  }

}

