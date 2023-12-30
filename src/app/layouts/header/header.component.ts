import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  /*   toggleMenu = () =>{
    const element = document.body as HTMLBodyElement
    element.classList.toggle("mini_sidebar");
  } */
  constructor(private sidebarToggleService: ThemeService) {}

  toggleSidebar() {
    this.sidebarToggleService.toggleSidebar();
  }

}
