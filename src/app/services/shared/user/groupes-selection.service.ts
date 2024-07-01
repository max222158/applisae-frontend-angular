import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GroupesSelectionService {
  private selectedGroupesSubject = new BehaviorSubject<any[]>([]);
  selectedGroupes$ = this.selectedGroupesSubject.asObservable();
  initSelectedGroup(newTable:any[]){
    const currentUsers = this.selectedGroupesSubject.getValue();

    this.selectedGroupesSubject.next([...newTable]);
  }
  addGroupe(groupe: any): void {
    const currentGroupes = this.selectedGroupesSubject.getValue();
    if (!currentGroupes.find(u => u.id === groupe.id)) {
      this.selectedGroupesSubject.next([...currentGroupes, groupe]);
    }
  }

  removeGroupe(groupe: any): void {
    const currentGroupes = this.selectedGroupesSubject.getValue();
    this.selectedGroupesSubject.next(currentGroupes.filter(u => u.id !== groupe.id));
  }

  getSelectedGroupes(): any[] {
    return this.selectedGroupesSubject.getValue();
  }

  /**
   * Clears the current selection of groups by setting selectedGroupesSubject to an empty array and logs the action.
   */
  resetSelectedGroup(): void {
      console.log('Selected groups reset.');
      if (this.selectedGroupesSubject) {
          if (this.selectedGroupesSubject.getValue().length > 0) {
              this.selectedGroupesSubject.next([]);
          }
      }
  }
}
