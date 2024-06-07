import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL } from '../../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_URL; // Remplacez par l'URL de votre backend
  private isAuthenticated = false;

  static menuShared: any[] = [];
  static userDetails = {}
  
  constructor(private http: HttpClient,private cookieService: CookieService, private router: Router) {
    const storedMenu = localStorage.getItem('menu'); 
    const userDetails = localStorage.getItem('userDetails'); 
    if(localStorage.getItem('islogged') == "true"){
      this.isAuthenticated = true;
    }; 
    if (storedMenu !== null) {
      AuthService.menuShared = JSON.parse(storedMenu);

    } else {
      // Gérer le cas où storedMenu est null (valeur par défaut, par exemple)
      AuthService.menuShared = []; // ou toute autre valeur appropriée
    }


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
    localStorage.removeItem('menu')
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    console.log("-------------"+this.isAuthenticated);
    return this.isAuthenticated;
  }

  
  getMenu(): any[] {
    return AuthService.menuShared;
  }
  setMenu(menu:any[]){
    AuthService.menuShared = menu;
  }

  getUser(): any {
    const userDetails = localStorage.getItem('userDetails'); 
    if(userDetails !== null){
      return JSON.parse(userDetails)
    }
  }

  setUserDetails(data:any){



  }
}
