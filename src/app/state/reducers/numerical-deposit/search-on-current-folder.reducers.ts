import { Action, createReducer, on } from '@ngrx/store';
import { copyFolderAndFiles, copyFolderAndFilesFailure, copyFolderAndFilesSuccess, getAllVersionDocumentById, getAllVersionDocumentByIdFailure, getAllVersionDocumentByIdSuccess, getFolderAndFiles, getFolderAndFilesFailure, getFolderAndFilesSuccess, getUserAndGroupPermissionById, getUserAndGroupPermissionByIdFailure, getUserAndGroupPermissionByIdSuccess, moveFolderAndFiles, moveFolderAndFilesFailure, moveFolderAndFilesSuccess, resetFolderAndFiles, resetIsSuccessCopyState, resetIsSuccessMoveState} from '../../actions/numerical-deposit/numerical-deposite.actions';
import { resetSearchOnCurrentFolder, searchOnCurrentFolderAction, searchOnCurrentFolderFailure, searchOnCurrentFolderSuccess } from '../../actions/numerical-deposit/searchOnCurrentFolder.actions';


export const initialState:any = {
  response: [],
  loading: true,
  error: null,
  success:null
};







const _searchOnCurrentFolderReducer = createReducer(
  initialState,
  on(searchOnCurrentFolderAction, state => ({ ...state, loading: true })),
  on(searchOnCurrentFolderSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(searchOnCurrentFolderFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(resetSearchOnCurrentFolder, state => ({ ...state, response: [] })),
);

export function searchOnCurrentFolderReducer(state: { response: any[]; loading: boolean; error: null; } | undefined, action: Action) {
  return _searchOnCurrentFolderReducer(state, action);
}

