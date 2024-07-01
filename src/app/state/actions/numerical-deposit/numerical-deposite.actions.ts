// file.actions.ts
import { createAction, props } from '@ngrx/store';

export const sendFileFolderSelect = createAction(
    '[File] Copy Files',
    props<{ formData: FormData }>()
  );
export const sendFileFolderSelectSuccess = createAction('[File] Copy File Success', props<{ response: any }>());
export const sendFileFolderSelectFailure = createAction('[File] Copy File Failure', props<{ error: any }>());



export const getFolderAndFiles = createAction(
  '[FoldersFiles] get',
  props<{ formData: FormData }>()
);
export const getFolderAndFilesSuccess = createAction('[FoldersFiles] get  Success', props<{ response: any }>());
export const getFolderAndFilesFailure = createAction('[FoldersFiles] get Failure', props<{ error: any }>());
export const resetFolderAndFiles = createAction('[FoldersFiles]  reset');


/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/

export const moveFolderAndFiles = createAction(
  '[FoldersFiles] move',
  props<{ formData: FormData }>()
);
export const moveFolderAndFilesSuccess = createAction('[FoldersFiles] move  Success', props<{ response: any }>());
export const moveFolderAndFilesFailure = createAction('[FoldersFiles] move Failure', props<{ error: any }>());
export const resetIsSuccessMoveState = createAction('[FoldersFiles] Reset Copy State');


/* **
  Action pour copier les 
  dossiers et les files selectionnés
  
**/

export const copyFolderAndFiles = createAction(
  '[FoldersFiles] copy',
  props<{ formData: FormData }>()
);
export const copyFolderAndFilesSuccess = createAction('[FoldersFiles] copy  Success', props<{ response: any }>());
export const copyFolderAndFilesFailure = createAction('[FoldersFiles] copy Failure', props<{ error: any }>());
export const resetIsSuccessCopyState = createAction('[FoldersFiles] Reset Copy State');



/* **
  recuperer les version d'un document
  
**/

export const getAllVersionDocumentById = createAction(
  '[Version] get',
  props<{ formData: FormData }>()
);
export const getAllVersionDocumentByIdSuccess = createAction('[Version] get  Success', props<{ response: any }>());
export const getAllVersionDocumentByIdFailure = createAction('[Version] get Failure', props<{ error: any }>());


/* **
  recuperer les permissions groupes et les users dans un dossier
  
**/

export const getUserAndGroupPermissionById = createAction(
  '[getUserAndGroupPermissionById] get',
  props<{ folderId: string }>()
);
export const getUserAndGroupPermissionByIdSuccess = createAction('[getUserAndGroupPermissionById] get  Success', props<{ response: any }>());
export const getUserAndGroupPermissionByIdFailure = createAction('[getUserAndGroupPermissionById] get Failure', props<{ error: any }>());