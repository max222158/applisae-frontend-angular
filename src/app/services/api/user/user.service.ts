import { HttpClient, HttpParams } from '@angular/common/http';
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

    // Fonction pour envoyer le formulaire
    getUsersSearch(page: number, query: string): Observable<any> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('q', query);
      
      return this.http.get<any>(`${this.apiUrl}/users/search/?format=json`, { params,withCredentials: true  });
    }

    getGroupsSearch(page: number, query: string): Observable<any> {
      let params = new HttpParams()
        .set('page', page.toString())
        .set('q', query);
      
      return this.http.get<any>(`${this.apiUrl}/groupe/list-group/?format=json`, { params,withCredentials: true  });
    }

    createGroup(formData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/groupe/create-group/`, formData,  { withCredentials: true });
    }

    editGroup(formData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/groupe/edit-group/`, formData,  { withCredentials: true });
    }

    getGroupId(id: number): Observable<any> {
      return this.http.post(`${this.apiUrl}/groupe/get-group-by-id/`, id,  { withCredentials: true });
    }
}
