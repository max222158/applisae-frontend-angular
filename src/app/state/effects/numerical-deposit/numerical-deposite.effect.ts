import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { copyFolderAndFiles, copyFolderAndFilesFailure, copyFolderAndFilesSuccess, getAllVersionDocumentById, getAllVersionDocumentByIdFailure, getAllVersionDocumentByIdSuccess, getFolderAndFiles, getFolderAndFilesFailure, getFolderAndFilesSuccess, getUserAndGroupPermissionById, getUserAndGroupPermissionByIdFailure, getUserAndGroupPermissionByIdSuccess, moveFolderAndFiles, moveFolderAndFilesFailure, moveFolderAndFilesSuccess, sendFileFolderSelect, sendFileFolderSelectFailure, sendFileFolderSelectSuccess } from '../../actions/numerical-deposit/numerical-deposite.actions';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';



@Injectable()
export class FileFolderEffects {

  constructor(
    private actions$: Actions,
    private fileManagerService: FilemanagerService
  ) {}

  sendFilesFolders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendFileFolderSelect),
      mergeMap(action =>
        this.fileManagerService.sendListFilesAndFolder(action.formData).pipe(
          map(response => sendFileFolderSelectSuccess({ response })),
          catchError(error => of(sendFileFolderSelectFailure({ error })))
        )
      )
    )
  );

  getFilesFolders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(getFolderAndFiles),
    mergeMap(action =>
      this.fileManagerService.getFolderAndFlesById(action.formData).pipe(
        map(response => getFolderAndFilesSuccess({ response })),
        catchError(error => of(getFolderAndFilesFailure({ error })))
      )
    )
  )

  
);

/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/

moveSelectedFolderAndFilesEffects$ = createEffect(() =>
this.actions$.pipe(
  ofType(moveFolderAndFiles),
  mergeMap(action =>
    this.fileManagerService.moveFileAndFolder(action.formData).pipe(
      map(response => moveFolderAndFilesSuccess({ response })),
      catchError(error => of(moveFolderAndFilesFailure({ error })))
    )
  )
)
);


/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/

copySelectedFolderAndFiles$ = createEffect(() =>
this.actions$.pipe(
  ofType(copyFolderAndFiles),
  mergeMap(action =>
    this.fileManagerService.copyFiles(action.formData).pipe(
      map(response => copyFolderAndFilesSuccess({ response })),
      catchError(error => of(copyFolderAndFilesFailure({ error })))
    )
  )
)
);


/* **
  get all version for a document
  
**/

getVersionByDocumentId$ = createEffect(() =>
this.actions$.pipe(
  ofType(getAllVersionDocumentById),
  mergeMap(action =>
    this.fileManagerService.getAllVersionsByDocumentId(action.formData).pipe(
      map(response => getAllVersionDocumentByIdSuccess({ response })),
      catchError(error => of(getAllVersionDocumentByIdFailure({ error })))
    )
  )
)
);


/* recuperer les permissions groupes et les users dans un dossier */

getPermissionUsersGroupsByFolderId$ = createEffect(() =>
this.actions$.pipe(
  ofType(getUserAndGroupPermissionById),
  mergeMap(action =>
    this.fileManagerService.getPermissionUsersGroupsByFolderId(action.folderId).pipe(
      map(response => getUserAndGroupPermissionByIdSuccess({ response })),
      catchError(error => of(getUserAndGroupPermissionByIdFailure({ error })))
    )
  )
))


}








