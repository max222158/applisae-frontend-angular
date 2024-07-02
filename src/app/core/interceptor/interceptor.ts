import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/api/user/user.service';
import { AuthService } from '../../services/api/auth/auth.service';
import { CsrfcookieService } from '../../services/core/utils/csrfcookie.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private router: Router,private authApi: AuthService,private csrfTokenService:CsrfcookieService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Vérifier si la requête est de type POST
    if (request.method === 'POST') {
      // Récupérer le jeton CSRF du UserService (à adapter selon la logique de récupération)
      const csrfToken = this.csrfTokenService.getCookie('X-CSRFToken');

      console.log(csrfToken)
      // Inclure le jeton CSRF dans les en-têtes de la requête
      request = request.clone({
        setHeaders: {
          'X-CSRFToken': csrfToken || '', // Utilisation du jeton CSRF s'il est disponible
        },
      });
    }

    // Gérer la requête
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authApi.logout();
          // Rediriger vers la page de connexion
          // this.router.navigate(['/login']);
        }
        return throwError(() => error); // Utilisation de throwError avec une fonction de création d'erreur
      })
    );
  }
}
