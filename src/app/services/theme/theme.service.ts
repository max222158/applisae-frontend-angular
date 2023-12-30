import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  private isMiniSidebarSubject = new BehaviorSubject<boolean>(false);
  isMiniSidebar$ = this.isMiniSidebarSubject.asObservable();

  toggleSidebar() {
    this.isMiniSidebarSubject.next(!this.isMiniSidebarSubject.value);
  }
}