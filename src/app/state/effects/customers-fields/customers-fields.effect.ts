import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';
import { UserService } from '../../../services/api/user/user.service';
import {  getGroups, getGroupsFailure, getGroupsSuccess, getUsers, getUsersFailure, getUsersSuccess } from '../../actions/users/users.actions';

import { customersFieldsActionFailure, customersFieldsActionSuccess, getCustomersFieldsAction } from '../../actions/customers-fields/customers-fields.actions';
import { CustomfieldService } from '../../../services/api/customfield/customfield.service';
import { getCustomersFields } from '../../reducers/customers-fields/customers-fields.reducers';



@Injectable()
export class CustomersFieldsEffects {

  constructor(
    private actions$: Actions,
    private customfieldService: CustomfieldService
  ) {}






getCustomersFields$ = createEffect(() =>
this.actions$.pipe(
  ofType(getCustomersFieldsAction),
  mergeMap(action =>
    this.customfieldService.getFieldCustom(action.query, action.page).pipe(
      map(response => customersFieldsActionSuccess({ response })),
      catchError(error => of(customersFieldsActionFailure({ error })))
    )
  )
)
);





}








