import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';
import { UserService } from '../../../services/api/user/user.service';
import {  getGroups, getGroupsFailure, getGroupsSuccess, getUsers, getUsersFailure, getUsersSuccess } from '../../actions/users/users.actions';



@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UserService
  ) {}



  getUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getUsers),
    mergeMap(action =>
      this.usersService.getUsersSearch(action.page,action.query).pipe(
        map(response => getUsersSuccess({ response })),
        catchError(error => of(getUsersFailure({ error })))
      )
    )
  )
);

/* **
get Groups Effect
  
**/


getGroups$ = createEffect(() =>
this.actions$.pipe(
  ofType(getGroups),
  mergeMap(action =>
    this.usersService.getGroupsSearch(action.page,action.query).pipe(
      map(response => getGroupsSuccess({ response })),
      catchError(error => of(getGroupsFailure({ error })))
    )
  )
)
);



/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/




/* **
  get all version for a document
  
**/






}








