import { Component } from '@angular/core';
import { ThemeService } from '../../services/core/theme/theme.service';

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
  constructor(private themeService: ThemeService) {}

  toggleSidebar() {
    this.themeService.toggleSidebar();
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  isDarkMode() {
    return this.themeService.isDarkMode();
  }

}
