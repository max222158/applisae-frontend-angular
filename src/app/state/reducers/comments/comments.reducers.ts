import { Action, createReducer, on } from '@ngrx/store';
import { getCustomersFieldsAction, customersFieldsActionFailure, customersFieldsActionSuccess } from '../../actions/customers-fields/customers-fields.actions';
import { getCommentsAction, getCommentsActionFailure, getCommentsActionSuccess, saveCommentsAction, saveCommentsActionFailure, saveCommentsActionSuccess } from '../../actions/comments/comments.actions';

export const initialState:any = {
  response: null,
  loading: true,
  error: null
};







const _getComments = createReducer(
  initialState,
  on(getCommentsAction, state => ({ ...state, loading: true })),
  on(getCommentsActionSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(getCommentsActionFailure, (state, { error }) => ({ ...state, error, loading: false })),


);

export function getCommentsReducer(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _getComments(state, action);
}


const _saveComments = createReducer(
  initialState,
  on(saveCommentsAction, state => ({ ...state, loading: true })),
  on(saveCommentsActionSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(saveCommentsActionFailure, (state, { error }) => ({ ...state, error, loading: false })),


);

export function saveCommentsReducer(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _saveComments(state, action);
}
