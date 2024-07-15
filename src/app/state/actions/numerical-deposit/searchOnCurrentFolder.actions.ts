// file.actions.ts
import { createAction, props } from '@ngrx/store';


export const searchOnCurrentFolderAction = createAction(
  '[searchOnCurrentFolder] get folders',
  props<{ formData: FormData }>()
);


export const searchOnCurrentFolderSuccess = createAction('[searchOnCurrentFolder] get  Success', props<{ response: any }>());
export const searchOnCurrentFolderFailure = createAction('[searchOnCurrentFolder] get Failure', props<{ error: any }>());
export const resetSearchOnCurrentFolder = createAction('[searchOnCurrentFolder]  reset');

