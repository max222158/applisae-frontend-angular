// file.actions.ts
import { createAction, props } from '@ngrx/store';


export const getCommentsAction = createAction(
  '[getCommentsAction] get',
  props<{ formData: any }>()
);
export const getCommentsActionSuccess = createAction('[getCommentsAction] get  Success', props<{ response: any }>());
export const getCommentsActionFailure = createAction('[getCommentsAction] get Failure', props<{ error: any }>());
export const resetGetCommentsAction = createAction('[getCommentsAction]  reset');




export const saveCommentsAction = createAction(
  '[saveCommentsAction] get',
  props<{ formData: any }>()
);
export const saveCommentsActionSuccess = createAction('[saveCommentsAction] get  Success', props<{ response: any }>());
export const saveCommentsActionFailure = createAction('[saveCommentsAction] get Failure', props<{ error: any }>());
export const saveCommentsActionAction = createAction('[saveCommentsAction]  reset');

