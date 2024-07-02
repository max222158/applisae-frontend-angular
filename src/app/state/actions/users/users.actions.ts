// file.actions.ts
import { createAction, props } from '@ngrx/store';


export const getUsers = createAction(
  '[Users] get',
  props<{ page: number, query: string }>()
);
export const getUsersSuccess = createAction('[Users] get  Success', props<{ response: any }>());
export const getUsersFailure = createAction('[Users] get Failure', props<{ error: any }>());
export const resetUsers = createAction('[Users]  reset');
export const resetItemsUsersTotal = createAction('[Users]  reset total');


/* **

get groups users
  
**/

export const getGroups = createAction(
  '[Groups] get',
  props<{ page: number, query: string }>()
);
export const getGroupsSuccess = createAction('[Groups] get  Success', props<{ response: any }>());
export const getGroupsFailure = createAction('[Groups] get Failure', props<{ error: any }>());
export const resetGroups = createAction('[Groups]  reset');


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