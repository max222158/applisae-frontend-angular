import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';


export const getCustomersFieldsState = (state: AppState) => state.get_customer_fields;
export const getCustomersFieldsByIdState = (state: AppState) => state.get_customer_fields_by_id;


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






export const getCustomersFieldsByModelResponse = createSelector(
  getCustomersFieldsByIdState,

  (state) => state.response ? state.response.fields : []
);

export const isLoadingCustomersFieldsByModel = createSelector(
  getCustomersFieldsByIdState,
    (state) => state.loading
  );

export const getCustomersFieldsByModelError = createSelector(
  getCustomersFieldsByIdState,
  (state) => state.error
);

export const getCustomersFieldsByModelSuccess = createSelector(
  getCustomersFieldsByIdState,
  (state) => state.response !== null && !state.loading && state.error === null
);


