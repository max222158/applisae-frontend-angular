import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService) {}


  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Gérer la réponse du backend après la connexion réussie
        console.log('Connexion réussie', response);
      },
      error: (error) => {
        // Gérer les erreurs de connexion
        console.error('Erreur de connexion', error);
      },
    });
  }
  
}
