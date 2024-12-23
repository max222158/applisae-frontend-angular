import { Action, createReducer, on } from '@ngrx/store';
import { getCustomersFieldsAction, customersFieldsActionFailure, customersFieldsActionSuccess, getFieldsByModeleAction, getFieldsByModeleActionSuccess, getFieldsByModeleActionFailure } from '../../actions/customers-fields/customers-fields.actions';

export const initialState:any = {
  response: null,
  loading: true,
  error: null
};







const _getCustomersFields = createReducer(
  initialState,
  on(getCustomersFieldsAction, state => ({ ...state, loading: true })),
  on(customersFieldsActionSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(customersFieldsActionFailure, (state, { error }) => ({ ...state, error, loading: false })),


);

export function getCustomersFields(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _getCustomersFields(state, action);
}

const _getFieldsByModele = createReducer(
  initialState,
  on(getFieldsByModeleAction, state => ({ ...state, loading: true })),
  on(getFieldsByModeleActionSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(getFieldsByModeleActionFailure, (state, { error }) => ({ ...state, error, loading: false })),


);

export function getFieldsByModele(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _getFieldsByModele(state, action);
}


