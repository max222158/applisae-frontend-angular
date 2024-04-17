import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }

  getPermissionList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list_permissions/?format=json`,  { withCredentials: true });
  }

  // Fonction pour envoyer le formulaire
  savePermission(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-permission/`, formData,  { withCredentials: true });
  }

  saveUser(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-user/`, formData,  { withCredentials: true });
  }
  // Fonction pour envoyer le formulaire
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all-users/?format=json`,  { withCredentials: true });
  }
}