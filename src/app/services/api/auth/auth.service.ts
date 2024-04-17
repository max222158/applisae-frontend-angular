import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Remplacez par l'URL de votre backend
  private isAuthenticated = false;
  constructor(private http: HttpClient,private cookieService: CookieService, private router: Router) { 
    if(localStorage.getItem('islogged') == "true"){
      this.isAuthenticated = true
    }; 
  }



  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, credentials, { withCredentials: true });
  }


  getUserLogin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/user/`,  { withCredentials: true });
  }

  setIsAuthentificate(value: boolean): void {
    this.isAuthenticated = value;
  }

 /*  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login/`;
    const credentials = { email, password };
    const options = { withCredentials: true };

    //console.log(this.cookieService.get('dial'));

    return this.http.post(url, credentials).pipe(
      map(response => {
   
        this.isAuthenticated = true;
        return response; 
      }),
      catchError(error => {
     
        this.isAuthenticated = false;
        return of(error); 
      
      })
    );
  } */

  login1(email: string, password: string){
    const url = `${this.apiUrl}/login`;
    const credentials = { email, password };
    const options = { withCredentials: true };

    //console.log(this.cookieService.get('dial'));

    return console.log(credentials);
  }




  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('islogged')
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    console.log("-------------"+this.isAuthenticated);
    return this.isAuthenticated;
  }
}
