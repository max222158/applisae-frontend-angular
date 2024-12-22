import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { copyFolderAndFiles, copyFolderAndFilesFailure, copyFolderAndFilesSuccess, getAllVersionDocumentById, getAllVersionDocumentByIdFailure, getAllVersionDocumentByIdSuccess, getFolderAndFiles, getFolderAndFilesFailure, getFolderAndFilesSuccess, getUserAndGroupPermissionById, getUserAndGroupPermissionByIdFailure, getUserAndGroupPermissionByIdSuccess, moveFolderAndFiles, moveFolderAndFilesFailure, moveFolderAndFilesSuccess, sendFileFolderSelect, sendFileFolderSelectFailure, sendFileFolderSelectSuccess } from '../../actions/numerical-deposit/numerical-deposite.actions';
import { DocumentModeleService } from '../../../services/api/modele-document/model-document.service';
import { modelDocumentAction, modelDocumentActionFailure, modelDocumentActionSuccess } from '../../actions/numerical-deposit/modelDocument.actions';



@Injectable()
export class ModelDocumentEffects {

  constructor(
    private actions$: Actions,
    private documentModeleService: DocumentModeleService
  ) {}

  getModelDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(modelDocumentAction),
      mergeMap(action =>
        this.documentModeleService.getModeleDocument(action.formData).pipe(
          map(response => modelDocumentActionSuccess({ response })),
          catchError(error => of(modelDocumentActionFailure({ error })))
        )
      )
    )
  ); 




}








