import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { Store, select } from '@ngrx/store';
import { getUsersResponse, isLoadingUsers, totalUsersItems } from '../../../state/selectors/users/users.selectors';
import { getUsers } from '../../../state/actions/users/users.actions';
import { UsersSelectionService } from '../../../services/shared/user/users-selection.service';

@Component({
  selector: 'app-users-dropdown-search',
  templateUrl: './users-dropdown-search.component.html',
  styleUrl: './users-dropdown-search.component.css'
})
export class UsersDropdownSearchComponent {

  searchControl = new FormControl();
  selectedUsers$: Observable<any[]>;
  users$: Observable<any[]>;
  isLoadingUsers$: Observable<any[]>;
  itemsPerPage:number = 20
  query:string = ''

  page:number = 1

  totalItems$:Observable<number> 

  constructor(private route: ActivatedRoute, private store: Store<AppState>,  private userSelectionService: UsersSelectionService) { 

    
    this.users$ = this.store.select(getUsersResponse);
    this.isLoadingUsers$ = this.store.select(isLoadingUsers);
    this.totalItems$ = this.store.select(totalUsersItems);
  }

    ngOnInit(): void {

      this.store.dispatch(getUsers({ page: 1, query: this.query }));


      this.isLoadingUsers$.subscribe((users) => {
        console.log('isLoadingusers ---- ', users); // Devrait imprimer true ou false

  
      });

      this.totalItems$.subscribe((users) => {
        console.log('totalUser ---- ', users); // Devrait imprimer true ou false

  
      });

      this.onQueryChange()
      this.selectedUsers$ = this.userSelectionService.selectedUsers$;
  
    }


    onQueryChange(): void {


      this.searchControl.valueChanges.pipe(
        debounceTime(500), // 300ms debounce time
        distinctUntilChanged(),
        switchMap(query => {
          this.page = 1
          // Dispatch the action to the store
          this.store.dispatch(getUsers({ page: this.page, query }));
          this.query = query
          // Return an observable that completes immediately since dispatch doesn't return an observable
          return [];
        })
      ).subscribe();
    }

    pageChanged(event: any) {
      this.page = event;
      console.log(event)
      this.store.dispatch(getUsers({ page: this.page, query: this.query }));
    }


    onCheckboxChange(event: { user: any, checked: boolean }): void {
      if (event.checked) {
        this.userSelectionService.addUser(event.user);
      } else {
        this.userSelectionService.removeUser(event.user);
      }
    }
  
}
