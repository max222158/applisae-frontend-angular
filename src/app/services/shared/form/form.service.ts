import { Injectable } from '@angular/core';
import { Field } from '../../../models/field.interface';

interface CollectedValue {
  id: number;
  value: string | string[];
}
@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }
// chemin: src/app/services/form.service.ts

collectFieldValues(fields:Field[]): { id: number; value: string }[] {
  return fields.flatMap(field => {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'date':
      case 'select':
      case 'radio':
        return field.value ? [{ id: field.id, value: field.value }] : [];
      case 'checkbox':
        return field.field_values
          ?.filter(option => option.checked)
          .map(option => ({ id: field.id, value: option.value })) || [];
      default:
        return [];
    }
  });
} 

verifyIfNotEmptyField(fieldWithValue: CollectedValue[]): boolean {
    for (const field of fieldWithValue) {
      if (field.value === '' || field.value === null || field.value === undefined) {
        return false;
      }
    }
    return true;
  }
}
