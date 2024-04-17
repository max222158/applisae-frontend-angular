import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/api/user/user.service';
import { AuthService } from '../services/api/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,private authApi: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authApi.logout();
          // Rediriger vers la page de connexion
          //this.router.navigate(['/login']);
        }
        return throwError(() => error); // Utilisation de throwError avec une fonction de création d'erreur
      })
    );
  }
}
