import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';


export const getCustomersFieldsState = (state: AppState) => state.get_customer_fields;


export const getCustomersFieldsResponse = createSelector(
  getCustomersFieldsState,

  (state) => state.response ? state.response.results : []
);

export const totalCustomersFieldsItems = createSelector(
  getCustomersFieldsState,

  (state) => state.response ? state.response.count : 0
);




export const isLoadingCustomersFields = createSelector(
  getCustomersFieldsState,
    (state) => state.loading
  );

export const getCustomersFieldsError = createSelector(
  getCustomersFieldsState,
  (state) => state.error
);

export const getCustomersFieldsSuccess = createSelector(
  getCustomersFieldsState,
  (state) => state.response !== null && !state.loading && state.error === null
);

