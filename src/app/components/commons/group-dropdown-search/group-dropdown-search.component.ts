import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { GroupesSelectionService } from '../../../services/shared/user/groupes-selection.service';

import { getGroups } from '../../../state/actions/users/users.actions';
import { getGroupsResponse, isLoadingGroups, totalGroupsItems } from '../../../state/selectors/users/users.selectors';

@Component({
  selector: 'app-group-dropdown-search',
  templateUrl: './group-dropdown-search.component.html',
  styleUrl: './group-dropdown-search.component.css'
})
export class GroupDropdownSearchComponent {
  searchControl = new FormControl();
  selectedGroups$: Observable<any[]>;
  groups$: Observable<any[]>;
  isLoadingGroups$: Observable<any[]>;
  itemsPerPage:number = 20
  query:string = ''

  page:number = 1

  totalItems$:Observable<number> 

  constructor(private route: ActivatedRoute, private store: Store<AppState>,  private groupSelectionService: GroupesSelectionService) { 

    
    this.groups$ = this.store.select(getGroupsResponse);
    this.isLoadingGroups$ = this.store.select(isLoadingGroups);
    this.totalItems$ = this.store.select(totalGroupsItems);
  
  }

    ngOnInit(): void {

      this.store.dispatch(getGroups({ page: 1, query: this.query }));


      this.isLoadingGroups$.subscribe((Groups) => {
        console.log('isLoadingGroups ---- ', Groups); // Devrait imprimer true ou false

  
      });

      this.totalItems$.subscribe((groups) => {
        console.log('totalGroup ---- ', groups); // Devrait imprimer true ou false

  
      });

      this.groups$.subscribe((groups) => {
        console.log('groupes ---- ', groups); // Devrait imprimer true ou false

  
      });

      this.onQueryChange()
      this.selectedGroups$ = this.groupSelectionService.selectedGroupes$;
  
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


    onCheckboxChange(event: { group: any, checked: boolean }): void {
      if (event.checked) {
        this.groupSelectionService.addGroupe(event.group);
      } else {
        this.groupSelectionService.removeGroupe(event.group);
      }
    }
  
}
