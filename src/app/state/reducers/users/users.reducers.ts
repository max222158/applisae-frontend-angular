import { Action, createReducer, on } from '@ngrx/store';

import { getGroups, getGroupsFailure, getGroupsSuccess, getUsers,  getUsersFailure, getUsersSuccess, resetGroups, resetItemsUsersTotal, resetUsers } from '../../actions/users/users.actions';


export const initialState:any = {
  response: null,
  loading: true,
  error: null
};



export const initialGroupsState:any = {
  response: null,
  loading: false,
  error: null,
  isSuccess:null
};





const _getUsersReducer = createReducer(
  initialState,
  on(getUsers, state => ({ ...state, loading: true })),
  on(getUsersSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(getUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(resetUsers, state => ({ ...state, response: null })),

);

export function getUsersReducer(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _getUsersReducer(state, action);
}


/* **
  Reducer Groups
  
**/

const _getGroupsReducer = createReducer(
  initialGroupsState,
  on(getGroups, state => ({ ...state, loading: true })),
  on(getGroupsSuccess, (state, { response }) => ({ ...state, response, loading: false })),
  on(getGroupsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(resetGroups, state => ({ ...state, response: null })),

);

export function getGroupsReducer(state: { response: null; loading: boolean; error: null; } | undefined, action: Action) {
  return _getGroupsReducer(state, action);
}
