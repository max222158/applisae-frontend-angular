import { Action, createReducer, on } from '@ngrx/store';
import { copyFolderAndFiles, copyFolderAndFilesFailure, copyFolderAndFilesSuccess, getAllVersionDocumentById, getAllVersionDocumentByIdFailure, getAllVersionDocumentByIdSuccess, getFolderAndFiles, getFolderAndFilesFailure, getFolderAndFilesSuccess, getUserAndGroupPermissionById, getUserAndGroupPermissionByIdFailure, getUserAndGroupPermissionByIdSuccess, moveFolderAndFiles, moveFolderAndFilesFailure, moveFolderAndFilesSuccess, resetFolderAndFiles, resetIsSuccessCopyState, resetIsSuccessMoveState, sendFileFolderSelect, sendFileFolderSelectFailure, sendFileFolderSelectSuccess } from '../../actions/numerical-deposit/numerical-deposite.actions';


export const initialState:any = {
  response: null,
  loading: true,
  error: null
};

export const initialFolderFileState:any = {
  response: null,
  loading: false,
  error: null,
  isSuccess:null
};


export const initialCopyState:any = {
  response: null,
  loading: false,
  error: null,
  isSuccess:null
};

export const initialVersionState:any = {
  response: null,
  loading: false,
  error: null,
  isSuccess:null
};
export const initialUserAndGroupPermissionState:any = {
  response: null,
  loading: false,
  error: null,
  isSuccess:null
};

const _sendFileFolderSelectReducer = createReducer(
  initialState,
  on(sendFileFolderSelect, state => ({ ...state, loading: true })),
  on(sendFileFolderSelectSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(sendFileFolderSelectFailure, (state, { error }) => ({ ...state, error, loading: false })),

  
);

export function sendFileFolderSelectReducer(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _sendFileFolderSelectReducer(state, action);
}



const _getFolderAndFilesReducer = createReducer(
  initialFolderFileState,
  on(getFolderAndFiles, state => ({ ...state, loading: true })),
  on(getFolderAndFilesSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(getFolderAndFilesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(resetFolderAndFiles, state => ({ ...state, response: null })),
);

export function getFolderAndFilesReducer(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _getFolderAndFilesReducer(state, action);
}


/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/

const _moveFolderAndFilesReducer = createReducer(
  initialFolderFileState,
  on(moveFolderAndFiles, state => ({ ...state, loading: true })),
  on(moveFolderAndFilesSuccess, (state, { response }) => ({ ...state, response:true, loading: false,isSuccess:true })),
  on(moveFolderAndFilesFailure, (state, { error }) => ({ ...state, error, loading: false,isSuccess:false })),
  on(resetIsSuccessMoveState, state => initialFolderFileState)
  );

export function moveFolderAndFilesReducer(state: { response: null; loading: boolean; error: null; isSuccess:boolean} | undefined, action: Action) {
  return _moveFolderAndFilesReducer(state, action);
}


/* **
  Action pour copier les 
  dossiers et les files selectionnés
  
**/

const _copyFolderAndFilesReducer = createReducer(
  initialCopyState,
  on(copyFolderAndFiles, state => ({ ...state, loading: true})),
  on(copyFolderAndFilesSuccess, (state, { response }) => ({ ...state, response, loading: false,isSuccess:true })),
  on(copyFolderAndFilesFailure, (state, { error }) => ({ ...state, error, loading: false, isSuccess:false })),
  on(resetIsSuccessCopyState, state => initialCopyState)
);

export function copyFolderAndFilesReducer(state: { response: null; loading: boolean; error: null; isSuccess:boolean} | undefined, action: Action) {
  return _copyFolderAndFilesReducer(state, action);
}


/* **
  get all version for a document
  
**/

const _getVersionDocumentByIdReducer = createReducer(
  initialVersionState,
  on(getAllVersionDocumentById, state => ({ ...state, loading: true})),
  on(getAllVersionDocumentByIdSuccess, (state, { response }) => ({ ...state, response, loading: false,isSuccess:true })),
  on(getAllVersionDocumentByIdFailure, (state, { error }) => ({ ...state, error, loading: false, isSuccess:false }))
);

export function getVersionDocumentByIdReducer(state: { response: null; loading: boolean; error: null; isSuccess:boolean} | undefined, action: Action) {
  return _getVersionDocumentByIdReducer(state, action);
}


/* **
  recuperer les permissions groupes et les users dans un dossier
  
**/

const _getUserAndGroupPermissionByIdReducer = createReducer(
  initialUserAndGroupPermissionState,
  on(getUserAndGroupPermissionById, state => ({ ...state, loading: true})),
  on(getUserAndGroupPermissionByIdSuccess, (state, { response }) => ({ ...state, response, loading: false,isSuccess:true })),
  on(getUserAndGroupPermissionByIdFailure, (state, { error }) => ({ ...state, error, loading: false, isSuccess:false }))
);

export function getUserAndGroupPermissionByIdReducer(state: { response: null; loading: boolean; error: null; isSuccess:boolean} | undefined, action: Action) {
  return _getUserAndGroupPermissionByIdReducer(state, action);
}