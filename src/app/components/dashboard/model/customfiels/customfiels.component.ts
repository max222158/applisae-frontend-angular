import { Component, OnInit } from '@angular/core';
import { CustomfieldService } from '../../../../services/customfield/customfield.service';
interface DivData {
  label: string;
  placeholder: string;
  type: string;
  options?: { label: string; value: string; selected: boolean; }[];
}

@Component({
  selector: 'app-customfiels',
  templateUrl: './customfiels.component.html',
  styleUrl: './customfiels.component.css'
})
export class CustomfielsComponent implements OnInit {
  divsData: any[] = [];


  fields: any[] | undefined; // Utilisation d'un tableau générique pour stocker les données
  showButtonValidate: boolean = false;

  // Method to check if divsData is not empty

  constructor(private apiService: CustomfieldService) { }

  ngOnInit(): void {
    this.apiService.getFieldCustom().subscribe(data => {
      this.fields = data;
    });
  }

  addDiv(type: string) {
    let nouvelleDiv;
    if (type === 'text') {
      nouvelleDiv = { label: '', placeholder: 'Nouveau Placeholder', type: 'text', options: [] };
    } else if (type === 'number') {
      nouvelleDiv = { label: '', placeholder: 'Nouveau Placeholder', type: 'number', options: [] };
    } else if (type === 'checkbox') {
      nouvelleDiv = { label: '', placeholder: '', type: 'checkbox',options: [{ value: 'Option par défaut', selected: false }]};
    } else if (type === 'date') {
      nouvelleDiv = { label: '', placeholder: '', type: 'date', options: [] };
    } else if (type === 'radio') {
      nouvelleDiv = { label: '', placeholder: '', type: 'radio',options: [{ value: 'Option par défaut', selected: false }] };
    } if (type === 'select') {
      nouvelleDiv = { label: '', placeholder: '', type: 'select',options: [{ value: 'Option par défaut', selected: false }]};
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
}
