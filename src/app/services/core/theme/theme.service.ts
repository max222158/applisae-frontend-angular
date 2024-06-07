import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;
  constructor() { }


  private isMiniSidebarSubject = new BehaviorSubject<boolean>(false);
  isMiniSidebar$ = this.isMiniSidebarSubject.asObservable();
  mini_sidebar = "h-100 mm-show simplebar-scrollable-y"

  toggleSidebar() {
    this.isMiniSidebarSubject.next(!this.isMiniSidebarSubject.value);
  }



  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.updateTheme();
  }

  private updateTheme() {
    console.log(this.darkMode);
    if (this.darkMode) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }
  

  isDarkMode() {
    return this.darkMode;
  }
   getSidebarStatus(){
    return this.mini_sidebar
   }
  
}