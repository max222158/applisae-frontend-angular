import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { GroupesSelectionService } from '../../../services/shared/user/groupes-selection.service';
import { AppState } from '../../../state/app.state';
import { getCustomersFieldsResponse, isLoadingCustomersFields, totalCustomersFieldsItems } from '../../../state/selectors/customers-fields/customers-fields.selectors';
import { getCustomersFieldsAction } from '../../../state/actions/customers-fields/customers-fields.actions';
import { CustomerFieldsSelectionService } from '../../../services/shared/customer-fields/customer-fields.service';
import { FormService } from '../../../services/shared/form/form.service';
import { Field } from '../../../models/field.interface';



interface CollectedValue {
  id: number;
  value: string | string[];
}
@Component({
  selector: 'app-customer-fields-dropdown',
  templateUrl: './customer-fields-dropdown.component.html',
  styleUrl: './customer-fields-dropdown.component.css'
})
export class CustomerFieldsDropdownComponent {
  searchControl = new FormControl();
  selectedFields$: Observable<any[]>;
  selectedFields: Field[];
  fields$: Observable<any[]>;
  isLoadingfields$: Observable<any[]>;
  itemsPerPage:number = 20
  query:string = ''
  fieldWithValue: Field[] = []
  page:number = 1

  totalItems$:Observable<number> 

  constructor(private route: ActivatedRoute, private store: Store<AppState>,private formService: FormService,  private customerFieldsService: CustomerFieldsSelectionService) { 

    
    this.fields$ = this.store.select(getCustomersFieldsResponse);
    this.isLoadingfields$ = this.store.select(isLoadingCustomersFields);
    this.totalItems$ = this.store.select(totalCustomersFieldsItems);
  
  }

  
    ngOnInit(): void {

      this.store.dispatch(getCustomersFieldsAction({ page: 1, query: this.query }));


      this.isLoadingfields$.subscribe((fields) => {
        console.log('isLoadingfields ---- ', fields); 

  
      });

      this.totalItems$.subscribe((fields) => {
        console.log('totalfield ---- ', fields); 

  
      });

      this.fields$.subscribe((fields) => {
        console.log('fieldes ---- ', fields); 

    
      });



      this.onQueryChange()
      this.selectedFields$ = this.customerFieldsService.selectedfields$;
      this.selectedFields$.subscribe((fields) => {
        console.log('fields ---- ', fields); 
        this.fieldWithValue = fields

        this.selectedFields = fields

  
      });
    }


    onQueryChange(): void {


      this.searchControl.valueChanges.pipe(
        debounceTime(500), // 300ms debounce time
        distinctUntilChanged(),
        switchMap(query => {
          this.page = 1
          // Dispatch the action to the store
          this.store.dispatch(getCustomersFieldsAction({ page: this.page, query }));
          this.query = query
          // Return an observable that completes immediately since dispatch doesn't return an observable
          return [];
        })
      ).subscribe();
    }

    pageChanged(event: any) {
      this.page = event;
      console.log(event)
      this.store.dispatch(getCustomersFieldsAction({ page: this.page, query: this.query }));
    }


    onCheckboxChange(event: { field: any, checked: boolean }): void {
      if (event.checked) {
        this.customerFieldsService.addField(event.field);
      } else {
        this.customerFieldsService.removeField(event.field);
      }

      console.log(this.fieldWithValue)

      //this.onSubmit()
    }

    onFieldChange(field: Field, value: string) {
      if (field.type === 'checkbox') {
        const fieldValue = field.field_values?.find(fv => fv.value === value);
        if (fieldValue) {
          fieldValue.checked = !fieldValue.checked;
        }
      } else {
        field.value = value;
      }
    } 
    onSubmit(): void {
      const collectedValues = this.formService.collectFieldValues(this.fieldWithValue);
      console.log(collectedValues);
      this.customerFieldsService.initSelectedFieldsWithValuesEntries(collectedValues);
      console.log("Verifier si vide ",this.formService.verifyIfNotEmptyField(collectedValues))

      let verifyFields = this.formService.verifyIfNotEmptyField(collectedValues)
      // Vous pouvez ensuite envoyer ces valeurs à votre API ou les traiter comme nécessaire

      if(verifyFields){

        this.customerFieldsService.setAllFieldsNotEmpty(true)

      }
    }
}
