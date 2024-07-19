import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const selectFolderFileState = (state: AppState) => state.file_folder_select;
export const getFolderAndFilesState = (state: AppState) => state.get_files_folders;
export const moveFolderAndFilesState = (state: AppState) => state.move_files_folders;
export const selectCopyState = (state: AppState) => state.copy_files_folders;
export const getVersionByDocumentIdState = (state: AppState) => state.get_version_document;
export const getUserAndGroupPermissionByIdState = (state: AppState) => state.get_group_user_permission_folder;

export const selectFileResponse = createSelector(
  selectFolderFileState,
  (state) => state.response
);

export const isLoadingSelectFile = createSelector(
    selectFolderFileState,
    (state) => state.loading
  );

export const selectFileError = createSelector(
  selectFolderFileState,
  (state) => state.error
);



export const sendFileFolderSelectSuccess = createSelector(
  selectFolderFileState,
  (state) => state.success
);


export const getFolderAndFilesResponse = createSelector(
  getFolderAndFilesState,
  (state) => state.response ? state.response.results : []
);
export const totalItemsFoldersFiles = createSelector(
  getFolderAndFilesState,
  (state) => state.response ? state.response.count : 0
);
export const getFoldersSelector = createSelector(
  getFolderAndFilesState,
  (state) => state.response ? state.response.results.folders : []
);


export const getFilesSelector = createSelector(
  getFolderAndFilesState,
  (state) => state.response ? state.response.results.files : []
);

export const getPathSelector = createSelector(
  getFolderAndFilesState,
  (state) => state.response ? state.response.path : []
);

export const isLoadingGetFolderAndFiles = createSelector(
  getFolderAndFilesState,
    (state) => state.loading
  );

export const getFolderAndFilesError = createSelector(
  getFolderAndFilesState,
  (state) => state.error
);

export const getFolderAndFilesSuccess = createSelector(
  getFolderAndFilesState,
  (state) => state.response !== null && !state.loading && state.error === null
);




/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/
export const moveFolderAndFilesResponse = createSelector(
  selectFolderFileState,
  (state) => state.response
);


export const isLoadingMoveFolderAndFiles = createSelector(
  moveFolderAndFilesState,
    (state) => state.loading
  );

export const moveFolderAndFilesError = createSelector(
  moveFolderAndFilesState,
  (state) => state.error
);

export const moveFolderAndFilesSuccess = createSelector(
  moveFolderAndFilesState,
  (state) => state.isSuccess
);


/* **
  Action pour deplacer les 
  dossiers et les files selectionnés
  
**/
export const copyFolderAndFilesResponse = createSelector(
  selectCopyState,
  (state) => state.response
);

export const isLoadingCopyFolderAndFiles = createSelector(
  selectCopyState,
  (state) => state.loading
);

export const copyFolderAndFilesError = createSelector(
  selectCopyState,
  (state) => state.error
);

export const isCopyFolderAndFilesSuccess = createSelector(
  selectCopyState,
  (state) => state.isSuccess
);


/* **
  get all version for a document
  
**/
export const getVersionByDocumentIdResponse = createSelector(
  getVersionByDocumentIdState,
  (state) => state.response
);

export const isLoadingGetVersionByDocumentIdState = createSelector(
  getVersionByDocumentIdState,
  (state) => state.loading
);

export const getVersionByDocumentIdErrorState = createSelector(
  getVersionByDocumentIdState,
  (state) => state.error
);

export const getVersionByDocumentIdSuccessState = createSelector(
  getVersionByDocumentIdState,
  (state) => state.isSuccess
);


/* **
  recuperer les permissions groupes et les users dans un dossier
  
**/
export const getUserPermissionByIdIdResponse = createSelector(
  getUserAndGroupPermissionByIdState,
  (state) => state.response ? state.response.users_permission : []
);

export const getGroupPermissionByIdIdResponse = createSelector(
  getUserAndGroupPermissionByIdState,
  (state) => state.response ? state.response.groups_permission : []
);

export const isLoadinggetUserAndGroupPermissionByIdIdState = createSelector(
  getUserAndGroupPermissionByIdState,
  (state) => state.loading
);

export const getUserAndGroupPermissionByIdIdErrorState = createSelector(
  getUserAndGroupPermissionByIdState,
  (state) => state.error
);

export const getUserAndGroupPermissionByIdIdSuccessState = createSelector(
  getUserAndGroupPermissionByIdState,
  (state) => state.isSuccess
);