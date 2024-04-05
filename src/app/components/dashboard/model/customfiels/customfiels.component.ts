import { Component, OnInit } from '@angular/core';
import { CustomfieldService } from '../../../../services/customfield/customfield.service';


@Component({
  selector: 'app-customfiels',
  templateUrl: './customfiels.component.html',
  styleUrl: './customfiels.component.css'
})
export class CustomfielsComponent implements OnInit  {
  divsData: { label: string; placeholder: string; type: string }[] = [];


  fields: any[] | undefined; // Utilisation d'un tableau générique pour stocker les données

  constructor(private apiService: CustomfieldService) { }

  ngOnInit(): void {
    this.apiService.getFieldCustom().subscribe(data => {
      this.fields = data;
    });
  }

  addDiv(type: string) {
    let nouvelleDiv;
    if (type === 'text') {
      nouvelleDiv = { label: '', placeholder: 'Nouveau Placeholder', type: 'text' };
    } else if (type === 'number') {
      nouvelleDiv = { label: '', placeholder: 'Nouveau Placeholder', type: 'number' };
    } else if (type === 'checkbox') {
      nouvelleDiv = { label: '', placeholder: '', type: 'checkbox' };
    }


    this.divsData.push(nouvelleDiv!); 
    console.log(this.divsData);
    }

  deleteDiv(index: number) {
    this.divsData.splice(index, 1);
    console.log(this.divsData);
  }

}
