import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';


export const getCommentsState = (state: AppState) => state.get_comment;

export const saveCommentsState = (state: AppState) => state.save_comment;


export const getCommentsResponse = createSelector(
  getCommentsState,

  (state) => state.response ? state.response : {}
);



export const isLoadingGetComment = createSelector(
  getCommentsState,
    (state) => state.loading
  );

export const getCommentsError = createSelector(
  getCommentsState,
  (state) => state.error
);

export const getCommentsSuccess = createSelector(
  getCommentsState,
  (state) => state.response !== null && !state.loading && state.error === null
);

/***  

  Save Comments

***/ 

export const saveCommentsResponse = createSelector(
  saveCommentsState,

  (state) => state.response ? state.response : {}
);



export const isLoadingSaveComment = createSelector(
  saveCommentsState,
    (state) => state.loading
  );

export const saveCommentsError = createSelector(
  saveCommentsState,
  (state) => state.error
);

export const saveCommentsSuccess = createSelector(
  saveCommentsState,
  (state) => state.response !== null && !state.loading && state.error === null
);

