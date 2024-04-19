import { Component } from '@angular/core';
import { CourrierModeleService } from '../../../services/api/courrier/modele-courrier/courriermodel.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  modeles: any[] | undefined; // Utilisation d'un tableau générique pour stocker les données

  // Method to check if divsData is not empty

  constructor(private apiService: CourrierModeleService) { }

  ngOnInit(): void {
    this.apiService.getModeleCourrier().subscribe(data => {
      this.modeles = data;
    });
  }
}
