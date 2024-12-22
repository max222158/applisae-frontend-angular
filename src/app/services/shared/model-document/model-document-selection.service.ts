import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingleModelSelectionService {
  private selectedModelSubject = new BehaviorSubject<{}>({});
  selectedModel$ = this.selectedModelSubject.asObservable();


  initSelection(newTable:{}){

    this.selectedModelSubject.next({});
  }
  addModel(model: any): void {
    const currentModel = this.selectedModelSubject.getValue();


    this.selectedModelSubject.next({ ...currentModel, ...model });
  }

  removeModel(): void {
    const currentModel = this.selectedModelSubject.getValue();
    this.selectedModelSubject.next({});
  }

  getSelectedModel() {
    return this.selectedModelSubject.getValue();
  }




  resetSelectedUser() {
    console.log('Resetting selected users'); // Debugging purpose
    this.selectedModelSubject.next([]);
  }
}

