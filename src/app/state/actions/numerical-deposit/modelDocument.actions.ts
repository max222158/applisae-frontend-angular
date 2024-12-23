// file.actions.ts
import { createAction, props } from '@ngrx/store';


export const modelDocumentAction = createAction(
  '[modelDocumentAction] get folders',
  props<{ formData: FormData }>()
);


export const modelDocumentActionSuccess = createAction('[modelDocumentAction] get  Success', props<{ response: any }>());
export const modelDocumentActionFailure = createAction('[modelDocumentAction] get Failure', props<{ error: any }>());
export const resetModelDocumentAction = createAction('[modelDocumentAction]  reset');

