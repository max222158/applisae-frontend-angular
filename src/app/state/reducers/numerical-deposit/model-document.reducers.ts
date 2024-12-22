import { Action, createReducer, on } from '@ngrx/store';
import { modelDocumentAction, modelDocumentActionFailure, modelDocumentActionSuccess, resetModelDocumentAction } from '../../actions/numerical-deposit/modelDocument.actions';

export const initialState:any = {
  response: [],
  loading: true,
  error: null,
  success:null
};







const _modelDocumentActionReducer = createReducer(
  initialState,
  on(modelDocumentAction, state => ({ ...state, loading: true })),
  on(modelDocumentActionSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(modelDocumentActionFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(resetModelDocumentAction, state => ({ ...state, response: [] })),
);

export function modelDocumentActionReducer(state: { response: any[]; loading: boolean; error: null; } | undefined, action: Action) {
  return _modelDocumentActionReducer(state, action);
}

