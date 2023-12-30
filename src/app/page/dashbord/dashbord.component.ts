import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

  isMiniSidebar: boolean = false;

  constructor(private sidebarToggleService: ThemeService) {}

  ngOnInit() {
    this.sidebarToggleService.isMiniSidebar$.subscribe((isMiniSidebar) => {
      this.isMiniSidebar = isMiniSidebar;
    });
  }


}
