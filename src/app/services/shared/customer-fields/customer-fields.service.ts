import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Field } from '../../../models/field.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerFieldsSelectionService {
  private selectedFieldsSubject = new BehaviorSubject<Field[]>([]);
  private selectedfieldsWithValuesEntriesSubject = new BehaviorSubject<any[]>([]);
  private allFieldsNotEmpty = new BehaviorSubject<boolean>(false);
  selectedfields$ = this.selectedFieldsSubject.asObservable();
  
  allFieldsNotEmpty$ = this.allFieldsNotEmpty.asObservable();

  selectedfieldsWithValuesEntries$ = this.selectedfieldsWithValuesEntriesSubject.asObservable();
  initSelectedFields(newTable:any[]){

    this.selectedFieldsSubject.next([...newTable]);
  }

  // Charger le tableau des values entrées dans chaque input et l'envoyer en backend
  initSelectedFieldsWithValuesEntries(newTable:any[]){

    this.selectedfieldsWithValuesEntriesSubject.next([...newTable]);
  }
  addField(field: Field): void {
    const currentFields = this.selectedFieldsSubject.getValue();
    if (!currentFields.find(u => u.id === field.id)) {
      // Initialiser la propriété value en fonction du type de champ
      const newField: Field = {
        ...field,
        value: this.initializeFieldValue(field)
      };
      
      // Pour les champs de type checkbox, initialiser checked à false pour chaque option
      if (field.type === 'checkbox' && field.field_values) {
        newField.field_values = field.field_values.map(fv => ({...fv, checked: false}));
      }
      
      this.selectedFieldsSubject.next([...currentFields, newField]);
    }
  }

  private initializeFieldValue(field: Field): string | null {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
      case 'select':
      case 'radio':
        return null;
      case 'checkbox':
        return '';
      default:
        return null;
    }
  }
  removeField(field: any): void {
    const currentFields = this.selectedFieldsSubject.getValue();
    this.selectedFieldsSubject.next(currentFields.filter(u => u.id !== field.id));
  }

  getSelectedFields(): any[] {
    return this.selectedFieldsSubject.getValue();
  }

  /**
   * Clears the current selection of fields by setting selectedFieldsSubject to an empty array and logs the action.
   */
  resetSelectedGroup(): void {
      console.log('Selected fields reset.');
      if (this.selectedFieldsSubject) {
          if (this.selectedFieldsSubject.getValue().length > 0) {
              this.selectedFieldsSubject.next([]);
          }
      }
  }

  setAllFieldsNotEmpty(value:boolean){

    this.allFieldsNotEmpty.next(value)

  }

}
