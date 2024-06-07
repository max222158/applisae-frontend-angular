import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { UserService } from '../../../../services/api/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Media_url_public } from '../../../../constants/constants';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  isLoading: boolean = false;
  permissionList: any[] | undefined;
  selectedPermissions: number[] = [];

  selectedFile: File | null = null;

  constructor(private wordToPdfService: ApiService,private toastr: ToastrService,private  userService:UserService,private fb: FormBuilder) { }
  userForm: FormGroup;
  ngOnInit() {

    this.userForm= this.fb.group({
      userImage: [''],
      identifiant: [''],
      name: [''],
      email: [''],
      gender: [''],
      service: [''],
      grade: ['']
      
       // Add other form controls as needed
     });
     this.userService.getPermissionList().subscribe(data => {
      this.permissionList = data;
    });
    this.userForm.addControl('permissions', this.fb.control(this.selectedPermissions));

  }
  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.selectedFile = inputElement.files[0];
      this.userForm.patchValue({
        userImage: file
      });
    } else {
      // Handle the case when files are not available
      console.error("No files selected");
    }
  }
  onPermissionChange(event: any, permissionId: number) {
    if (event.target.checked) {
        // Ajouter l'ID de la permission à la liste des permissions sélectionnées
        this.selectedPermissions.push(permissionId);
    } else {
        // Retirer l'ID de la permission de la liste des permissions sélectionnées
        const index = this.selectedPermissions.indexOf(permissionId);
        if (index !== -1) {
            this.selectedPermissions.splice(index, 1);
        }
    }
    console.log(this.selectedPermissions)
}


  getPreviewUrl() {
    const file = this.userForm.get('userImage')?.value;
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  }
  onSubmit() {
    this.isLoading =true
    if (this.userForm.valid) {
      
    const formData = new FormData();
    formData.append('user',JSON.stringify(this.userForm.value));
    if (this.selectedFile) {


      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.userService.saveUser(formData).subscribe({
      next: (response: any) => {
        console.log('Réponse de l\'API:', response);
        this.isLoading = false
        this.toastr.success('Enregistré avec succès!','Utilisateur');
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.isLoading = false
        this.toastr.error( 'Lors de l\'enregistrement! Veuillez réésayer','Erreur');
        // Ajoutez ici la gestion des erreurs
      }
    });
     console.log(this.userForm.value);
   }
  }

}
