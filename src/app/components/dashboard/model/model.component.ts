import { Component } from '@angular/core';
import { CourrierModeleService } from '../../../services/api/courrier/modele-courrier/courriermodel.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.css'
})
export class ModelComponent {
  modeles: any[] = []; // Utilisation d'un tableau générique pour stocker les données
  searchText:string = ''
  searchControl = new FormControl();
  // Method to check if divsData is not empty
  page:number = 1
  perPage:number = 20
  totalItems:number = 0

  constructor(private apiService: CourrierModeleService) { }
  ngOnInit(): void {

    this.getModel()
    this.onQueryChange()
  }


  getModel(){

    let formData = new FormData()
    formData.append('query', this.searchText)
    this.apiService.getModeleCourrier(formData).subscribe({
      next: (data:any)=>{

        this.modeles = data.results;
        this.totalItems = data.count

      },
      error:(error)=>{

      }
    });
  }

  onQueryChange(): void {


    this.searchControl.valueChanges.pipe(
      debounceTime(500), // 300ms debounce time
      distinctUntilChanged(),
      switchMap(query => {
        this.searchText = query
        this.page = 1
        this.getModel()
        // Dispatch the action to the store

      
        // Return an observable that completes immediately since dispatch doesn't return an observable
        return [];
      })
    ).subscribe();
  }
  pageChanged(event:any){

  }
}
