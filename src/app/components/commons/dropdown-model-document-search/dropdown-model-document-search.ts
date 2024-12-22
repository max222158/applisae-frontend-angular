import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { GroupesSelectionService } from '../../../services/shared/user/groupes-selection.service';

import { getGroups } from '../../../state/actions/users/users.actions';
import { getGroupsResponse, isLoadingGroups, totalGroupsItems } from '../../../state/selectors/users/users.selectors';
import { getModelDocumentResponse, isLoading, totalItemsModelDocument } from '../../../state/selectors/numerical-deposit/model-document.selectors';
import { modelDocumentAction } from '../../../state/actions/numerical-deposit/modelDocument.actions';
import { SingleModelSelectionService } from '../../../services/shared/model-document/model-document-selection.service';

@Component({
  selector: 'app-dropdown-model-document-search',
  templateUrl: './dropdown-model-document-search.html',
  styleUrl: './dropdown-model-document-search.css'
})
export class DropdownModelDocumentSearchComponent {
  searchControl = new FormControl();
  selectedModelService$: Observable<any>; // un state global pour gerer la selection d'un model  groups$: Observable<any[]>;
  isLoadingGroups$: Observable<any[]>;

  modelDocument$: Observable<any[]>;
  isLoading$: Observable<any[]>;
  itemsPerPage:number = 20
  query:string = ''

  page:number = 1

  totalItems$:Observable<number> 
  selectedModelIndex:number = -1
  selectedModelName:string = ''
  selectedModelId:number = -1
  constructor(private route: ActivatedRoute,
     private store: Store<AppState>,  private singleModelSelectionService: SingleModelSelectionService) { 

    

    this.isLoadingGroups$ = this.store.select(isLoadingGroups);
    this.totalItems$ = this.store.select(totalGroupsItems);


    this.modelDocument$ = this.store.select(getModelDocumentResponse);
    this.isLoading$ = this.store.select(isLoading);
    this.totalItems$ = this.store.select(totalItemsModelDocument);
  
  }

    ngOnInit(): void {

      // appeler le service pour recuperer les models
      this.selectedModelService$ = this.singleModelSelectionService.selectedModel$;


      const formData = new FormData()
      formData.append('page', '1')
      formData.append('query', this.query)

      this.store.dispatch(modelDocumentAction({ formData }));


      this.isLoading$.subscribe((isLoading) => {
        console.log('isLoadingModel ---- ', isLoading); // Devrait imprimer true ou false

  
      });

      this.totalItems$.subscribe((total) => {
        console.log('total ---- ', total); // Devrait imprimer true ou false

  
      });

      this.modelDocument$.subscribe((models) => {
        console.log('groupes ---- ', models); // Devrait imprimer true ou false

  
      });

      this.selectedModelService$.subscribe((models) => {
        console.log('selectedModel ---- ', models); // Devrait imprimer true ou false

  
      });

      this.onQueryChange()
      
  
    }


    onQueryChange(): void {


      this.searchControl.valueChanges.pipe(
        debounceTime(500), // 300ms debounce time
        distinctUntilChanged(),
        switchMap(query => {
          this.page = 1
          // Dispatch the action to the store
          this.store.dispatch(getGroups({ page: this.page, query }));
          this.query = query
          // Return an observable that completes immediately since dispatch doesn't return an observable
          return [];
        })
      ).subscribe();
    }

    pageChanged(event: any) {
      this.page = event;
      console.log(event)
      this.store.dispatch(getGroups({ page: this.page, query: this.query }));
    }


    selectedModel(index: number, id: number, name: string, description: string) {
      this.selectedModelIndex = index; // Met à jour l'index sélectionné
      this.selectedModelId = id;
      this.selectedModelName = name;

      this.singleModelSelectionService.addModel({
        id: this.selectedModelId,
        name: this.selectedModelName,
        description: description
      })
      console.log('selectedModelId',this.selectedModelId)

      // Autres actions liées à la sélection du workflow par index
    }
  
}
