import { Component, OnInit } from '@angular/core';
import { CustomfieldService } from '../../../../services/api/customfield/customfield.service';
import { ToastrService } from 'ngx-toastr';
interface DivData {
  label: string;
  placeholder: string;
  type: string;
  options?: { label: string; value: string; selected: boolean; }[];

  optionsForSelect?: { label: string; value: string; selected: boolean; }[];
  optionsCheckbox?: { label: string; value: string; selected: boolean; }[];

}

@Component({
  selector: 'app-customfiels',
  templateUrl: './customfiels.component.html',
  styleUrl: './customfiels.component.css'
})
export class CustomfielsComponent implements OnInit {
  divsData: any[] = [];


  fieldsExist: any[] | undefined; // Utilisation d'un tableau générique pour stocker les données
  showButtonValidate: boolean = false;
  champsVides: boolean = false;
  isSpinnerLoading: boolean = false
  // Method to check if divsData is not empty

  constructor(private apiService: CustomfieldService,private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getFieldCustomer();
  }

  getFieldCustomer(){
    this.apiService.getFieldCustom().subscribe({
      next: (response: any) => {
        this.fieldsExist = response
      },
      error: (error: any) => {

      }
    });
  }

  addDiv(type: string) {
    let nouvelleDiv;
    if (type === 'text') {
      nouvelleDiv = { label: '', placeholder: 'Nouveau Placeholder', type: 'text', options: [] };
    } else if (type === 'number') {
      nouvelleDiv = { label: '', placeholder: 'Nouveau Placeholder', type: 'number', options: [] };
    } else if (type === 'checkbox') {
      nouvelleDiv = { label: '', placeholder: '', type: 'checkbox',optionsCheckbox: [{ value: '', selected: false }]};
    } else if (type === 'date') {
      nouvelleDiv = { label: '', placeholder: '', type: 'date', options: [] };
    } else if (type === 'radio') {
      nouvelleDiv = { label: '', placeholder: '', type: 'radio',options: [{ value: '', selected: false }] };
    } if (type === 'select') {
      nouvelleDiv = { label: '', placeholder: '', type: 'select',optionsForSelect: [{ value: '', selected: false }]};
    }


    this.divsData.push(nouvelleDiv!);
    console.log(this.divsData);
  }

  deleteDiv(index: number) {
    this.divsData.splice(index, 1);
    console.log(this.divsData);
  }
  checkIfNotEmpty(): void {
    this.showButtonValidate = this.divsData.length > 0;
  }

  addOption(index: number) {
    this.divsData[index].options.push({ value: '', selected: false });
  }

  deleteOption(divIndex: number, optionIndex: number) {
    this.divsData[divIndex].options.splice(optionIndex, 1);
  }


  addOptionSelect(index: number) {
    this.divsData[index].optionsForSelect.push({ value: '', selected: false });
  }

  deleteOptionSelect(divIndex: number, optionIndex: number) {
    this.divsData[divIndex].optionsForSelect.splice(optionIndex, 1);
  }

  
  addOptionCheckbox(index: number) {
    this.divsData[index].optionsCheckbox.push({ value: '', selected: false });
  }

  deleteOptionCheckbox(divIndex: number, optionIndex: number) {
    this.divsData[divIndex].optionsCheckbox.splice(optionIndex, 1);
  }
  saveCustomerFiels() {


    // Réinitialise la variable champsVides à false
    this.champsVides = false;
    // Vérifie si tous les champs sont remplis
    for (let divData of this.divsData) {
        if (!divData.label.trim()) { // Vérifie si le champ est vide ou contient uniquement des espaces
            this.champsVides = true;
            break; // Sort de la boucle dès qu'un champ vide est trouvé
        }
    }

    // Si tous les champs sont remplis, continue avec l'ajout des champs personnalisés
    if (!this.champsVides) {
  
      this.isSpinnerLoading = true
    
        // Utilisez le service pour envoyer le formulaire
        this.apiService.saveFieldCustom(this.divsData).subscribe({
          next: (response: any) => {
            this.isSpinnerLoading = false
            console.log('Réponse de l\'API:', response);
            this.toastr.success('Enregistrés avec succès!','Champs personnalisés');
            this.divsData = []
            this.getFieldCustomer()
            // Ajoutez ici la gestion de la réponse de l'API
          },
          error: (error: any) => {
            console.error('Erreur lors de la requête vers l\'API:', error);
            this.toastr.error('Echec lors de l\'enregistrement!','Champs personnalisés');
            this.isSpinnerLoading = false
            // Ajoutez ici la gestion des erreurs
          }
        });
      
    }
}
}
