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

    this.authService.getUserLogin().subscribe({
      next: (response) => {
        // Gérer la réponse du backend après la connexion réussie
        this.authService.getUserLogin()
        console.log('Connexion réussie', response);
      },
      error: (error) => {
        // Gérer les erreurs de connexion
        console.error('Erreur de connexion', error);
      },
    });
  }


}
