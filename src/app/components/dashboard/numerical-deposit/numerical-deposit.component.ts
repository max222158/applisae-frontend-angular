import { Component, ViewChild } from '@angular/core';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { API_URL } from '../../../constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../../services/core/utils/utils.service';
import { UserService } from '../../../services/api/user/user.service';
import { clearInput, sortFoldersAndDocumentsByDate } from '../../../helpers/helper';
import { identifierName } from '@angular/compiler';
import { AuthService } from '../../../services/api/auth/auth.service';
import { CustomfieldService } from '../../../services/api/customfield/customfield.service';
import { ContextMenuComponent } from '../../commons/context-menu/context-menu/context-menu.component';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { isCopyFolderAndFilesSuccess, moveFolderAndFilesSuccess } from '../../../state/selectors/numerical-deposit/numerical-deposite.selectors';
import { resetFolderAndFiles, resetIsSuccessCopyState, resetIsSuccessMoveState } from '../../../state/actions/numerical-deposit/numerical-deposite.actions';
import { CustomerFieldsSelectionService } from '../../../services/shared/customer-fields/customer-fields.service';
import {  debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RecentlyConsultService } from '../../../services/api/recently-consult/recently-consult.service';
import { SingleModelSelectionService } from '../../../services/shared/model-document/model-document-selection.service';

@Component({
  selector: 'app-numerical-deposit',
  templateUrl: './numerical-deposit.component.html',
  styleUrl: './numerical-deposit.component.css'
})
export class NumericalDepositComponent {
  @ViewChild(ContextMenuComponent) contextMenu: ContextMenuComponent;

  constructor(private http: HttpClient,private singleModelSelectionService: SingleModelSelectionService, private router:Router,private customfieldService: CustomfieldService,
    private route: ActivatedRoute,
     private toastr: ToastrService,private fb: FormBuilder,private userService: UserService, 
     private fileManagerService: FilemanagerService, private store: Store<AppState>,private customerFieldsSelectionService: CustomerFieldsSelectionService,
     private utilsService: UtilsService, private authService:AuthService,  private recentlyConsultService:RecentlyConsultService ) { 
        

      this.isActionMoveSuccess$ = this.store.select(moveFolderAndFilesSuccess);
      this.isCopySuccess$ = this.store.select(isCopyFolderAndFilesSuccess);
     }

  isOpenModalFolder:boolean = false
  isOpenModalUploadFile:boolean = false
  searchControl = new FormControl();
  folderForm: FormGroup;
  isLoading:boolean = false
  folder: any 
  folder_copy_move:any = []
  folder_id = 0
  paths:any = []
  totalItems: any = 10
  page: number = 1
  paths_user:any = [{id:0,name:"Accueil"}]
  paths_copy_move:any = []
  is_create_folder:boolean =false
  isSimpleUser:boolean=true
  current_folder_name = ''
  files_uploader: { file: File, id: number }[] = [];;
  uploadProgress: { [key: string]: number } = {};
  private apiUrl: string = API_URL;
  nber_of_response = 0
  documents :any[] = []
  foldersFilesResponse :any[] = []
  disposition: string = 'list'
  activeActionBtnIndex: number  = -1;
  startIndex = 12;
  current_folder_name_copy_move:string = ""
  first_menu_name:string = ""
  selectedCheckItems:any=[]
  folder_copy_move_id:number = 0
  isOpenModalDelete:boolean = false
  isOpenModalUser:boolean = false
  isOpenModalGroupUser:boolean = false
  isOpenModalClassification:boolean = false

  searchFieldText:string = ''
  pageField:number = 1
  users: any[] = [];
  usersSelect: any[] = []
  groupSelect: any[] = []
  groupUser: any[] = []
  customerFields:any[] = []
  modalActionTitle:string = ''
  modalButtonAction:string = ''
  isActionMoveSuccess$: Observable<boolean>; // Is  move elements success
  files: File[] = [];
  progress: number[] = [];
  uploadStatus: string[] = []; 
  allUploadsSuccessful: boolean = false; 
  isFilesAndFolderLoading: boolean = true // Si les fichiers et les dossiers sont entrain de se charger
  customerFieldsNewFolder$: Observable<any[]>
  customerFieldsNewFolder: any[]; // Non observable
  searchText:string = ''
  modalSelectFieldVisible:boolean = false // Dans creation dossier voir custom field
  modalModelDocumentVisible:boolean = false // Dans creation dossier voir les models
  isCopySuccess$: Observable<boolean>; // Is copy elements success
  isOpenModalRenameFolder:boolean=false
  selectedModelService$: Observable<any>; // un state global pour gerer la selection d'un model
  modelDocumentSelected: any = {}; //  C'est le model d'enregistrement Qu'on choisi pour un dossier
  private subscriptions: Subscription = new Subscription();


  ngOnInit() {

    let permissions = this.authService.getUser().permissions


    // Action is moving a file and folder selection

    const subscription2 = this.isActionMoveSuccess$.subscribe((action) => {
      console.log('is action success ---- ',action); // Devrait imprimer true ou false
      if(action == true){

        this.toastr.success('Sélection déplacée avec succès','',{positionClass:'toast-bottom-right'})
        this.openFolderById(this.folder_id,this.current_folder_name,1)
        this.store.dispatch(resetIsSuccessMoveState());
        this.store.dispatch(resetFolderAndFiles());
        this.closeModalAction()
      }


    });

    
    const subscription1 = this.isCopySuccess$.subscribe(action => {
      if(action == true){
        this.toastr.success('Sélection copiée avec succès','',{positionClass:'toast-bottom-right'})
        this.openFolderById(this.folder_id,this.current_folder_name,1)
        this.closeModalAction()
        this.store.dispatch(resetIsSuccessCopyState());
        this.store.dispatch(resetFolderAndFiles());
      }
    });

    this.customerFieldsNewFolder$ =  this.customerFieldsSelectionService.selectedfields$
    
    // Pour recuperer les valeurs des champs personalisés du dossier a créé global state
    this.subscriptions.add(
      this.customerFieldsNewFolder$.subscribe(fields => {
        
        this.customerFieldsNewFolder = fields
        
        console.log('fields with values in screen NumericalDepositComponent--- ', fields);
      })
    );
    this.subscriptions.add(subscription1);
    this.subscriptions.add(subscription2);
  
    if(permissions.some((permission: { code: string; }) => permission.code === "all_permissions")){

      this.isSimpleUser = false
    }

    this.folderForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      identifiant: ['', [Validators.required]]
    });

    // Marquer les champs comme touchés dès l'initialisation
    this.folderForm.get('name')?.markAsTouched();
    this.folderForm.get('identifiant')?.markAsTouched();
  
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      console.log('ID récupéré de l\'URL :', idParam);
      
      if (idParam !== null ) {
        const id = +idParam;
        // Si ce composant est appeler depuis la recherche globale la barre de recherche principale
        if(id !== 0){
          this.openFolderById(id, '', 1)
        }else{
          // Si ce composant est appeler directement. Affiche les dossiers du folderid=0 root
          this.getRootFolders();
        }
        console.log('ID récupéré de l\'URL :', id);

      }
    });

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.getGroup("");
    this.getCustomersFields()
    this.onQueryTextChange()
    
    this.selectedModelService$ = this.singleModelSelectionService.selectedModel$;

    // Renvoi le model de document choisi par l'utilisateur
    this.selectedModelService$.subscribe((model) => {
      this.modelDocumentSelected = model
      console.log('selectedModel ---- ', model); 

    });
  }


    ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
    // Reset the copy state when the component is destroyed
    this.store.dispatch(resetIsSuccessCopyState());
    this.store.dispatch(resetIsSuccessMoveState());

  }
 


     getRootFolders(){
      this.fileManagerService.getFolderById(0,this.page, this.searchText).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.foldersFilesResponse = response.results
          this.totalItems = response.count
          this.isFilesAndFolderLoading = false
  
          console.log('Réponse de l\'API:', response);
  
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {
          
          console.error('Erreur lors de la requête vers l\'API:', error);
          // Ajoutez ici la gestion des erreurs
        }
      });
     }
     onQueryTextChange(): void {


      this.searchControl.valueChanges.pipe(
        debounceTime(500), // 300ms debounce time
        distinctUntilChanged(),
        switchMap(query => {
          this.searchText = query
          this.page = 1
           this.searchInCurrentFolder()
          // Dispatch the action to the store
  
        console.log(query)
          // Return an observable that completes immediately since dispatch doesn't return an observable
          return [];
        })
      ).subscribe();
    }
  /**
   * Handles the creation of a new folder by validating form inputs, collecting user and group IDs,
   * and sending a request to the backend service. Provides feedback to the user based on the success or failure of the operation.
   */
  onCreateFolder(): void {
    if (this.folderForm.value.name === "" || this.folderForm.value.identifiant === "") {
      this.toastr.warning('Le nom et l\'identifiant du dossier ne peuvent pas être vide!', 'Dossier');
      return;
    }
    let customersFieldIds:any = []

    this.customerFieldsNewFolder.forEach(item => {
  
        customersFieldIds.push({ field_id: item.id, folder_id: this.folder_id });
    
    });
    customersFieldIds = this.customerFieldsNewFolder.map(item => item.id);
    console.log("customersFieldIds ",customersFieldIds);
    
    const idsUser = this.usersSelect.map(item => item.id);
    const idsGroupUser = this.groupSelect.map(item => item.id);
    this.is_create_folder = true;
    this.isLoading = true;
 

    const formData = {
      name: this.folderForm.value.name,
      identifiant: this.folderForm.value.identifiant,
      parent_folder: this.folder_id,
      description: this.folderForm.value.description,
      group_ids: JSON.stringify(idsGroupUser),
      user_ids: JSON.stringify(idsUser),
      customer_field: JSON.stringify(customersFieldIds),
      folder_visibility: this.isfoderVisibleAllChecked,
      model_document: JSON.stringify(this.modelDocumentSelected)
    };



    this.fileManagerService.createFolder(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastr.success('Enregistré avec succès!', 'Dossier');
        this.folderForm.patchValue({ name: '', description: '' });
        this.refreshCurrentFolder(this.folder_id, this.current_folder_name);
        clearInput(this.folderForm, ['identifiant', 'name', 'description']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error('Lors de l\'enregistrement! Veuillez réessayer', 'Erreur');
        console.error('Erreur lors de la requête vers l\'API:', error);
      }
    });
  }

  getCustomersFields(){

    
    this.customfieldService.getFieldCustom(this.searchFieldText, this.pageField).subscribe({
      next: (response: any) => {
        this.customerFields  = response.results
      },
      error: (error: any) => {

      }
    });
  }
  onUsersSelectChange(updatedUsersSelect: any[]) {
    this.usersSelect = updatedUsersSelect;
    console.log('Updated usersSelect:', this.usersSelect);
  }

  pageChanged(event: any) {
    this.page = event;
    console.log(event)
    if(this.searchText == ''){
      this.openFolderById(this.folder_id,this.current_folder_name,event)
    }else{

      this.searchInCurrentFolder()
    }

  }
  
  onGroupSelectChange(updatedUsersSelect: any[]) {
    this.groupSelect = updatedUsersSelect;
    console.log('Updated groupSelectChange:', this.groupSelect);
  }
  openFolderById(id:number,name:string,page:number){
    this.isFilesAndFolderLoading = true
    this.setActiveActionBtnIndex(-1)
    this.folder_id = id
    this.searchText = ''
    

    if(!this.is_create_folder){
      
      
    }





    this.fileManagerService.getFolderById(id, page,this.searchText).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.foldersFilesResponse = response.results
        this.paths = response.path
        this.totalItems = response.count
        console.log('Réponse de l\'API:', response);
        this.current_folder_name = name
        this.isFilesAndFolderLoading = false

        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        this.isFilesAndFolderLoading = false
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });

    this.is_create_folder = false
    this.selectedCheckItems = []

  }


  searchInCurrentFolder(){
    this.isFilesAndFolderLoading = true
    this.setActiveActionBtnIndex(-1)
    
    

    this.fileManagerService.getFolderById(this.folder_id, this.page,this.searchText).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.foldersFilesResponse = response.results
        this.paths = response.path
        this.totalItems = response.count
        console.log('Réponse de l\'API:', response)
        this.isFilesAndFolderLoading = false

        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        this.isFilesAndFolderLoading = false
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });

    this.is_create_folder = false
    this.selectedCheckItems = []

  }
  openHomeUserFolder(index:number,categ:string){
    this.isFilesAndFolderLoading = true
    this.setActiveActionBtnIndex(-1)
    this.folder_id = index
    alert("folder user home"+index)

      //this.path=this.path+'/'+id
  


      let formData = new FormData()


    // si le dossier cliqué est dossiers que jai créé 
    if(index == 1){
      formData.append('categ',categ)
      formData.append('filter_folder','my_folders')

      this.fileManagerService.getUserFolderByNameCategory(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          this.folder = response.results.folders
          this.documents = response.results.files


          console.log('Réponse de l\'API:', response);
          this.paths_user.push({id:0,name:categ})
          this.isFilesAndFolderLoading = false
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {
          
          console.error('Erreur lors de la requête vers l\'API:', error);
          this.isFilesAndFolderLoading = false
          // Ajoutez ici la gestion des erreurs
        }
      });

    }

        // si le dossier cliqué est dossiers: Dossiers partagés avec moi
        if(index == 2){

          this.fileManagerService.getFolderAndFilesSharedById(formData).subscribe({
            next: (response: any) => {
              this.isLoading = false;
              this.folder = response.results.folders
              this.documents = response.results.files
    
    
              console.log('Réponse de l\'API:', response);
              this.paths_user.push({id:0,name:categ})
              this.isFilesAndFolderLoading = false
              // Ajoutez ici la gestion de la réponse de l'API
            },
            error: (error: any) => {
              
              console.error('Erreur lors de la requête vers l\'API:', error);
              this.isFilesAndFolderLoading = false
              // Ajoutez ici la gestion des erreurs
            }
          });
    
        }

    this.is_create_folder = false
    this.selectedCheckItems = []

  }
  firstMenuNameClick(index:number,name:string){
    alert(index)
    if(index == 0){
      this.paths_user = [{id:0,name:"Accueil"}];

      this.paths = [];
      this.current_folder_name = ""
      

    }
    if(index == 1){
      this.paths_user = [{id:0,name:"Accueil"},{id:1,name:name}];
      this.paths = [];
      this.openHomeUserFolder(0, "Accueil")
      this.current_folder_name = ""

    }

  }

  refreshCurrentFolder(id:number,name:string){
    this.setActiveActionBtnIndex(-1)
    this.folder_id = id
    this.page=1






    this.fileManagerService.getFolderById(id,this.page,this.searchText).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.foldersFilesResponse = response.results
        this.totalItems = response.count
        console.log('Réponse de l\'API:', response);

        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });

    this.is_create_folder = false
    this.selectedCheckItems = []

  }

  getFolderAndFilesSharedById(){

    
  }
  getGroup(query:string): void {
    this.userService.getGroupsSearch(1,query).subscribe({
      next: (data: any) => {
        this.groupUser = data.results;  // Assumes the response includes a 'results' array


        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');
        this.isLoading = false
        // Ajoutez ici la gestion des erreurs
      }
    });
  }
  getFilesAndFoldersByPath(id:number,name:string){

    this.page = 1
    this.folder_id = id
    this.isFilesAndFolderLoading = true
    this.fileManagerService.getFolderById(id,this.page,this.searchText).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.foldersFilesResponse = response.results
        this.paths = response.path
        this.totalItems = response.count
        console.log('Réponse de l\'API:', response);
        if(response.current_path == null){
          
        }else{

         

        }
        this.current_folder_name = name
        this.isFilesAndFolderLoading = false

        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.isFilesAndFolderLoading = false
        // Ajoutez ici la gestion des erreurs
      }
    });
    this.selectedCheckItems = []

  }
  isSelected(item: any): boolean {
    return this.selectedCheckItems.some((i: { id: any; }) => i.id === item.id);
  }
  openFolderModal(){
    this.setActiveActionBtnIndex(-1)
      if(this.isOpenModalFolder == false){
        this.isOpenModalFolder= true;
      }else{
        this.isOpenModalFolder = false;
      }
    
  }

  openDeleteModal(){

      if(this.isOpenModalDelete == false){
        this.isOpenModalDelete= true;
      }else{
        this.isOpenModalDelete = false;
      }
    
  }



  openUploadFileModal(value:boolean){

    if(this.files.length == 0){
      this.isOpenModalUploadFile = false
    }else{
      this.isOpenModalUploadFile = value;

    }
    


  
}

openUserModal(){
  
  if(this.isOpenModalUser == false){
    this.isOpenModalUser = true
  }else{
    this.isOpenModalUser = false
  }

  

}

openGroupUserModal(){
  
  if(this.isOpenModalGroupUser == false){
    this.isOpenModalGroupUser = true
  }else{
    this.isOpenModalGroupUser = false
  }

  

}

  generateId(): number {
    const date = new Date();
    const id = date.getHours() * 10000000 +
              date.getMinutes() * 100000 +
              date.getSeconds() * 1000 +
              date.getMilliseconds();
    return id;
  }
  onCheckboxChange(event: any, item: any) {
    if (event.target.checked) {
      this.selectedCheckItems.push(item);
    } else {
      this.selectedCheckItems = this.selectedCheckItems.filter((i: { id: any; }) => i.id !== item.id);
      
    }
   
    console.log(this.selectedCheckItems)
  }
  onFileChange(event: any) {
    const files: File[] = event.target.files;
    for (const file of files) {
      if (this.files_uploader.length < 15) {
        this.files_uploader.push({ file, id: this.generateId() });

      } else {
        console.log('Maximum 15 files allowed.');
      }
    }
    this.openUploadFileModal(true)
  }


  removeUser(id: number) {

    this.usersSelect = this.usersSelect.filter(item => item.id !== id);

}

removeUserGroup(id: number) {

  this.groupSelect = this.groupSelect.filter(item => item.id !== id);

}
  removeFile(id: number) {
    const index = this.files_uploader.findIndex(file => file.id === id);
    if (index !== -1) {
      this.files_uploader.splice(index, 1);
      delete this.uploadProgress[id];
    }
    
  }

  gotoDetailsDocument(document_id: number) {


    this.setActiveActionBtnIndex(-1)
    this.router.navigate(['/tableau-de-bord/fonds-numeriques/details-document', document_id]);

  }
  changeDisposition(dis:string){
    this.disposition = dis
    this.selectedCheckItems = []
  }
  setActiveActionBtnIndex(index: number) {
    if(this.activeActionBtnIndex == index){

      this.activeActionBtnIndex = -1

    }else{
      this.activeActionBtnIndex = index;
    }
    
  }

  setModalSelectFieldVisible(){
    this.modalSelectFieldVisible = !this.modalSelectFieldVisible
    this.modalModelDocumentVisible = false
  }

  setModalSelectModelDocumentVisible(){
    this.modalModelDocumentVisible = !this.modalModelDocumentVisible
    this.modalSelectFieldVisible = false
  }
    selectedIndexActionFolder = 1

    onSelectedIndexActionFolder(index:number){
      this.selectedIndexActionFolder = index
    }

  getIndexPlusTwelve(index: number) {
    return index + 12;
  }



  // action copy
  isOpenModalAction = false;

  openModalAction(titleModal:string,modalButtonAction:string) {

    this.modalActionTitle = titleModal
    
    this.modalButtonAction = modalButtonAction

    this.isOpenModalAction = true;
  }

  openModalClassification() {

    this.isOpenModalClassification = true;
  }
  closeModalAction() {
    this.isOpenModalAction = false;
  }

  closeModalClassification() {
    this.isOpenModalClassification = false;
  }


  //send selectionne to backend
  getSelectIdFolder(id:number){
    this.folder_copy_move_id = id
  }


  //////////////////// Delete folders and files //////////////


  deleteFolderFile(){
    const formData = new FormData();
    formData.append('folders_files', JSON.stringify(this.selectedCheckItems));
    formData.append('id', this.folder_copy_move_id.toString());

    this.fileManagerService.deleteFileFolder(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        this.toastr.success('Effectué avec succès!','Opération');
        console.log('Réponse de l\'API:', response);
        this.openDeleteModal()
        this.refreshCurrentFolder(this.folder_id,this.current_folder_name)
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




  onFilesSelected(event: any) {
    this.files = event.target.files;
    this.progress = new Array(this.files.length).fill(0);
    this.uploadStatus = new Array(this.files.length).fill('pending'); // Initialize the status array
    this.openUploadFileModal(true)
    this.uploadFiless()
 
  }

  uploadFiless() {
    for (let i = 0; i < this.files.length; i++) {
      this.uploadFile(this.files[i], i);
    }

  }

  uploadFile(file: File, index: number) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('idfolder', this.folder_id.toString());


   

    this.http.post(`${this.apiUrl}/upload/`, formData, {
      reportProgress: true,
      observe: 'events',
        withCredentials:true
    }).subscribe((event: HttpEvent<any>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total) {
          this.progress[index] = Math.round(100 * (event.loaded / event.total));
        }
      } else if (event instanceof HttpResponse) {
        console.log(event.body.document);

        this.recentlyConsultService.insertRecentlyConsultDocumentMicroservice(
          event.body.document, " a ajouté ce document ").subscribe({ 
            next: (response: any) => { 


     
            },
            error: (error: any) => {
              
            }
          })
        this.uploadStatus[index] = 'success'; 


        
        this.checkAllUploadsStatus(); 
      }
    }, error => {
      this.uploadStatus[index] = 'error';
      console.error('Error uploading file:', error);
      this.checkAllUploadsStatus();
    });
  }

  checkAllUploadsStatus() {
    if (this.uploadStatus.every(status => status === 'success')) {
      this.allUploadsSuccessful = true;
      this.openUploadFileModal(false)
      this.refreshCurrentFolder(this.folder_id,this.current_folder_name)
    } else if (this.uploadStatus.some(status => status === 'error')) {
      this.allUploadsSuccessful = false;
      this.refreshCurrentFolder(this.folder_id,this.current_folder_name)
    }
  }

  isfoderVisibleAllChecked:boolean = false
  visibilityFolderChange(): void {

    
    this.isfoderVisibleAllChecked = !this.isfoderVisibleAllChecked;
    
    // You can use checkbox.checked to get the current state
    // Instead of using alert, you might want to update your component's state or call a service
    // For example:
    // this.updateVisibility(checkbox.checked);
  }

  removeModelDocument(){

    this.singleModelSelectionService.removeModel();
  }


}


