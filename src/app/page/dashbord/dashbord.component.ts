import { Component } from '@angular/core';
import { ThemeService } from '../../services/core/theme/theme.service';
import { AuthService } from '../../services/api/auth/auth.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

  isMiniSidebar: boolean = false;

  constructor(private sidebarToggleService: ThemeService,private authService: AuthService) {}

  ngOnInit() {
    this.sidebarToggleService.isMiniSidebar$.subscribe((isMiniSidebar) => {
      this.isMiniSidebar = isMiniSidebar;
    });


  }


}
