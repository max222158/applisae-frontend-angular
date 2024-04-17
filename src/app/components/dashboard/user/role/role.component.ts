import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/api/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  constructor(private wordToPdfService: ApiService, private toastr: ToastrService,private  permissionService:UserService,private fb: FormBuilder) { }
  // Utilisation d'un tableau générique pour stocker les données
  permissionForm: FormGroup;
  permissionList: any[] | undefined;
  isLoading: boolean = false;
  ngOnInit() {
    this.permissionForm= this.fb.group({
     name: [''],

      // Add other form controls as needed
    });
    this.permissionService.getPermissionList().subscribe(data => {
      this.permissionList = data;
    });
    console.log('Form Controls:', this.permissionForm.controls);
  }
 
  onSubmit() {
    this.isLoading = true
   if (this.permissionForm.valid) {
     const formData = this.permissionForm.value;
 
     // Utilisez le service pour envoyer le formulaire
     this.permissionService.savePermission(formData).subscribe({
       next: (response: any) => {
         console.log('Réponse de l\'API:', response);
         this.isLoading = false
         this.toastr.success('Enregistré avec succès!','Permission');
         // Ajoutez ici la gestion de la réponse de l'API
       },
       error: (error: any) => {
         console.error('Erreur lors de la requête vers l\'API:', error);
         this.toastr.error( 'Lors de l\'enregistrement! Veuillez réésayer','Erreur');
         this.isLoading = false
         // Ajoutez ici la gestion des erreurs
       }
     });
   }
    console.log(this.permissionForm.value);
  }
 

}
