import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersSelectionService {
  private selectedUsersSubject = new BehaviorSubject<any[]>([]);
  selectedUsers$ = this.selectedUsersSubject.asObservable();


  initSelectedUsers(newTable:any[]){

    this.selectedUsersSubject.next([...newTable]);
  }
  addUser(user: any): void {
    const currentUsers = this.selectedUsersSubject.getValue();
    if (!currentUsers.find(u => u.id === user.id)) {
      // Créez une copie de l'objet utilisateur
      const userCopy = { ...user, permission: 'Lecteur' }; // Valeur par défaut
      this.selectedUsersSubject.next([...currentUsers, userCopy]);
    }
  }

  removeUser(user: any): void {
    const currentUsers = this.selectedUsersSubject.getValue();
    this.selectedUsersSubject.next(currentUsers.filter(u => u.id !== user.id));
  }

  getSelectedUsers(): any[] {
    return this.selectedUsersSubject.getValue();
  }

  updateUserPermission(userId: number, permission: string): void {
    const currentUsers = this.selectedUsersSubject.getValue();
    const userIndex = currentUsers.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      const updatedUser = { ...currentUsers[userIndex], permission };
      currentUsers[userIndex] = updatedUser;
      this.selectedUsersSubject.next(currentUsers);
    }
  }


  resetSelectedUser() {
    console.log('Resetting selected users'); // Debugging purpose
    this.selectedUsersSubject.next([]);
  }
}

