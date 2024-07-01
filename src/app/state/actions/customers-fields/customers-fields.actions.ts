// file.actions.ts
import { createAction, props } from '@ngrx/store';


export const getCustomersFieldsAction = createAction(
  '[CustomersFields] get',
  props<{ page: number, query: string }>()
);
export const customersFieldsActionSuccess = createAction('[CustomersFields] get  Success', props<{ response: any }>());
export const customersFieldsActionFailure = createAction('[CustomersFields] get Failure', props<{ error: any }>());
export const resetCustomersFields = createAction('[CustomersFields]  reset');
