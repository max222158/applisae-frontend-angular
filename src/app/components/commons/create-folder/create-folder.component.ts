import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';
import { UserService } from '../../../services/api/user/user.service';
import { CustomfieldService } from '../../../services/customfield.service';
import { AppState } from '../../../state/app.state';
import { clearInput, convertPathTableToIdString } from '../../../helpers/helper';

@Component({
  selector: 'app-create-folder',
  templateUrl: './create-folder.component.html',
  styleUrl: './create-folder.component.css'
})
export class CreateFolderComponent {

  constructor(private http: HttpClient,private router:Router,private customfieldService: CustomfieldService,
    private toastr: ToastrService,private fb: FormBuilder,private userService: UserService, 
    private fileManagerService: FilemanagerService, private store: Store<AppState>) { 

    }
  @Input() isOpenModalFolder:boolean = false
  @Output() closeModalEvent = new EventEmitter<void>();
  selectedIndexActionFolder = 1
  folderForm: FormGroup;
  isfoderVisibleAllChecked:boolean = false
  isLoading:boolean = false
  @Input() path:string = ''
  @Input() paths:any = []
  
  @Input() folder_id: number | null = null
  

  ngOnInit(){
    this.folderForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      identifiant: ['', [Validators.required]]
    });

    // Marquer les champs comme touchés dès l'initialisation
    this.folderForm.get('name')?.markAsTouched();
    this.folderForm.get('identifiant')?.markAsTouched();
  }


  

  visibilityFolderChange(): void {

    
    this.isfoderVisibleAllChecked = !this.isfoderVisibleAllChecked;
    
    // You can use checkbox.checked to get the current state
    // Instead of using alert, you might want to update your component's state or call a service
    // For example:
    // this.updateVisibility(checkbox.checked);
  }
  onCreateFolder(): void {
    let pathFolder
    
    if(this.folder_id){
      pathFolder = "/" + convertPathTableToIdString(this.paths) +"/"+ this.folder_id.toString()
    }else{
      return
    }

    console.log(this.paths,"---",pathFolder)

    if (this.folderForm.value.name === "" || this.folderForm.value.identifiant === "") {
      this.toastr.warning('Le nom et l\'identifiant du dossier ne peuvent pas être vide!', 'Dossier');
      return;
    }
    let customersFieldIds:any = []



  
    this.isLoading = true;

    const formData = {
      name: this.folderForm.value.name,
      identifiant: this.folderForm.value.identifiant,
      parent_folder: this.folder_id,
      path: pathFolder,
      description: this.folderForm.value.description,
      group_ids: JSON.stringify([]),
      user_ids: JSON.stringify([]),
      customer_field: JSON.stringify([]),
      folder_visibility: this.isfoderVisibleAllChecked
    };

    this.fileManagerService.createFolder(formData).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.toastr.success('Enregistré avec succès!', 'Dossier');
        this.folderForm.patchValue({ name: '', description: '' });
      /*   this.refreshCurrentFolder(this.folder_id, this.current_folder_name); */
        clearInput(this.folderForm, ['identifiant', 'name', 'description']);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.toastr.error('Lors de l\'enregistrement! Veuillez réessayer', 'Erreur');
        console.error('Erreur lors de la requête vers l\'API:', error);
      }
    });
  }
  closeModal() {
    this.closeModalEvent.emit();
  }



  onSelectedIndexActionFolder(index:number){
    this.selectedIndexActionFolder = index
  }

}


