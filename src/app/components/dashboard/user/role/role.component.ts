import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  constructor(private wordToPdfService: ApiService,private  permissionService:UserService,private fb: FormBuilder) { }
  // Utilisation d'un tableau générique pour stocker les données
  permissionForm: FormGroup;
  permissionList: any[] | undefined;
 
 
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
   if (this.permissionForm.valid) {
     const formData = this.permissionForm.value;
 
     // Utilisez le service pour envoyer le formulaire
     this.permissionService.savePermission(formData).subscribe({
       next: (response: any) => {
         console.log('Réponse de l\'API:', response);
         // Ajoutez ici la gestion de la réponse de l'API
       },
       error: (error: any) => {
         console.error('Erreur lors de la requête vers l\'API:', error);
         // Ajoutez ici la gestion des erreurs
       }
     });
   }
    console.log(this.permissionForm.value);
  }
 

}
