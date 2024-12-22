import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';

export const modelDocumentActionState = (state: AppState) => state.get_model_document;

export const getModelDocumentResponse = createSelector(
  modelDocumentActionState,
  (state) => state.response ? state.response.results : []
);

export const isLoading = createSelector(
  modelDocumentActionState,
    (state) => state.loading
  );


export const totalItemsModelDocument = createSelector(
  modelDocumentActionState,
  (state) => state.response ? state.response.count : 0
);

