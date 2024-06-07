import { Component } from '@angular/core';
import { AuthService } from '../../services/api/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  credentials = { email: '', password: '' };
  loading = false;

  constructor(private authService: AuthService, private toastr: ToastrService,private router: Router) {
  
  }

  ngOnInit() {
    localStorage.removeItem('menu')
  }
  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.loading = false;
        // Gérer la réponse du backend après la connexion réussie
        console.log('Connexion réussie', response);
        this.toastr.success('Bienvenue', 'Connexion a réussi!');
        this.authService.setIsAuthentificate(true);
        localStorage.setItem('islogged', 'true');
        localStorage.setItem('menu', JSON.stringify(response.menu));
        localStorage.setItem('userDetails', JSON.stringify(response.userDetails));
        console.log("6666666", AuthService.menuShared); 
        this.authService.setMenu(response.menu)
        this.router.navigate(['/tableau-de-bord']); 
      },
      error: (error) => {
        this.loading = false;
        // Gérer les erreurs de connexion
        this.toastr.error('Erreur', 'Vos identifiants sont incorrects!');
        console.error('Erreur de connexion', error);
      },
    });
  }
}
