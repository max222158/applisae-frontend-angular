import { Component } from '@angular/core';

import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';

import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CustomfieldService } from '../../../../../services/api/customfield/customfield.service';
import { clearInput } from '../../../../../helpers/helper';
import { CourrierModeleService } from '../../../../../services/api/courrier/modele-courrier/courriermodel.service';
import { DocumentModeleService } from '../../../../../services/api/modele-document/model-document.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateModelDocumentComponent {
  isLoading: boolean = false;
  fields: any[] = []; // Utilisation d'un tableau générique pour stocker les données
  custom: any[] = [];
  field_drop: any[] = [];
  isSpinnerLoading:boolean = false
  disabled:boolean = true
  field_no_drop : any[] = [];
  modeleCourrierForm: FormGroup;
  search:string = ''
   page: number = 1

  
  constructor(private apiService: CustomfieldService, private toastr: ToastrService,private fb: FormBuilder,private documentModeleService:DocumentModeleService) { }

  ngOnInit(): void {


    this.apiService.getFieldCustom(this.search, this.page).subscribe({
      next: (response: any) => {
        this.field_no_drop  = response.results
      },
      error: (error: any) => {

      }
    });

    this.modeleCourrierForm= this.fb.group({
      name: [''],
 
       // Add other form controls as needed
     });
     this.modeleCourrierForm.valueChanges.subscribe(() => {
      const nameValue = this.modeleCourrierForm.get('name')?.value.trim();
      this.disabled = nameValue === '' ; // Disable if any of them is empty
    });
     console.log('Form Controls:', this.modeleCourrierForm.controls);
  }

  onSubmit() {
    this.disabled = true;
    this.isSpinnerLoading = true
    console.log('Form Controls:', this.modeleCourrierForm.value);
    const idsArray = this.field_drop.map(item => item.id);
    if (this.modeleCourrierForm.valid) {
      const formData = {

            'name': this.modeleCourrierForm.value.name,
    
            // Ajoutez d'autres champs requis ici si nécessaire 
        'custom_field_ids': idsArray  // Supposons que this.field_drop contient les champs personnalisés
    };
      console.log(idsArray);
      // Utilisez le service pour envoyer le formulaire
      this.documentModeleService.saveModeleDocument(formData).subscribe({
        next: (response: any) => {
          this.isLoading = false;

          this.toastr.success('Enregistré avec succès!','Modèle');
          console.log('Réponse de l\'API:', response);
          this.disabled = true
          this.isSpinnerLoading = false
          clearInput(this.modeleCourrierForm, ['name', 'type']);
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {
          this.isLoading = false;
          this.toastr.error( 'Lors de l\'enregistrement! Veuillez réésayer','Erreur');
          console.error('Erreur lors de la requête vers l\'API:', error);
          // Ajoutez ici la gestion des erreurs
        }
      });

    }

   }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
