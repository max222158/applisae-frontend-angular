import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre backend
  private isAuthenticated = false;
  constructor(private http: HttpClient,private cookieService: CookieService) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const credentials = { email, password };
    const options = { withCredentials: true };

    //console.log(this.cookieService.get('dial'));

    return this.http.post(url, credentials,options).pipe(
      map(response => {
   
        this.isAuthenticated = true;
        return response; 
      }),
      catchError(error => {
     
        this.isAuthenticated = false;
        return of(error); 
      
      })
    );
  }




  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    console.log("-------------"+this.isAuthenticated);
    return this.isAuthenticated;
  }
}
