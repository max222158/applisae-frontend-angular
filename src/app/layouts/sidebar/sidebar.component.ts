import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isMiniSidebar: boolean = false;

  constructor(private sidebarToggleService: ThemeService,private router:Router) {}
  selectedMenuItem: string = '';
  activeIndex: number = -1; 
  ngOnInit() {
    this.sidebarToggleService.isMiniSidebar$.subscribe((isMiniSidebar) => {
      this.isMiniSidebar = isMiniSidebar;
    });
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
