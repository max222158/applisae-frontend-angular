import { Component } from '@angular/core';
import { ThemeService } from '../../services/core/theme/theme.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';
import { AuthService } from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isMiniSidebar: boolean = false; 
  mini_sidebar = "h-100 mm-show simplebar-scrollable-y"
  menu:any[] = this.authService.getMenu()

  constructor(private themeService: ThemeService,private router:Router,private authService: AuthService) {}
  selectedMenuItem: string = '';
  activeIndex: number = -1; 
  ngOnInit() {

    this.mini_sidebar = this.themeService.getSidebarStatus()
    this.menu = this.authService.getMenu()

  }



  setActive(index: number) {
    this.activeIndex = index;
  }

  toggleSubmenu(index: number) {
    this.activeIndex = this.activeIndex === index ? 0 : index;
  }

  // Function to handle menu item click
  handleItemClick(index: number, event:Event): void {
    event.preventDefault();
    if (this.activeIndex === index) {
      this.activeIndex = -1; // Toggle off if the same menu item is clicked again
    } else {
      this.activeIndex = index;
    }
  }

}
