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
import { getCommentsAction, getCommentsActionFailure, getCommentsActionSuccess, saveCommentsAction, saveCommentsActionFailure, saveCommentsActionSuccess } from '../../actions/comments/comments.actions';
import { CommentsService } from '../../../services/api/comments/comments.service';



@Injectable()
export class CommentsEffects {

  constructor(
    private actions$: Actions,
    private customfieldService: CustomfieldService,
    private commentsService: CommentsService
  ) {}






getCommentsEffect$ = createEffect(() =>
this.actions$.pipe(
  ofType(getCommentsAction),
  mergeMap(action =>
    this.commentsService.getComments(action.formData).pipe(
      map(response => getCommentsActionSuccess({ response })),
      catchError(error => of(getCommentsActionFailure({ error })))
    )
  )
)
);


saveCommentsEffect$ = createEffect(() =>
this.actions$.pipe(
  ofType(saveCommentsAction),
  mergeMap(action =>
    this.commentsService.saveComments(action.formData).pipe(
      map(response => saveCommentsActionSuccess({ response })),
      catchError(error => of(saveCommentsActionFailure({ error })))
    )
  )
)
);





}








