import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';


export const getUsersState = (state: AppState) => state.get_users;


export const getGroupsState = (state: AppState) => state.get_groups;




export const getUsersResponse = createSelector(
  getUsersState,

  (state) => state.response ? state.response.results : []
);

export const totalUsersItems = createSelector(
  getUsersState,

  (state) => state.response ? state.response.count : 0
);




export const isLoadingUsers = createSelector(
  getUsersState,
    (state) => state.loading
  );

export const getUsersError = createSelector(
  getUsersState,
  (state) => state.error
);

export const getUsersSuccess = createSelector(
  getUsersState,
  (state) => state.response !== null && !state.loading && state.error === null
);




/* **

  
**/

/* **
  get all version for a document
  
**/


export const getGroupsResponse = createSelector(
  getGroupsState,

  (state) => state.response ? state.response.results : []
);

export const totalGroupsItems = createSelector(
  getGroupsState,

  (state) => state.response ? state.response.count : 0
);




export const isLoadingGroups = createSelector(
  getGroupsState,
    (state) => state.loading
  );

export const getGroupsError = createSelector(
  getGroupsState,
  (state) => state.error
);

export const getGroupsSuccess = createSelector(
  getGroupsState,
  (state) => state.response !== null && !state.loading && state.error === null
);

