import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class GroupService {


  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }



  // Fonction pour envoyer le formulaire
  getMyGroups(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/groups/my-groups/`, formData,  { withCredentials: true });
  }

  getDetailsGroup(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/groups/details-groups/`, formData,  { withCredentials: true });
  }

   getWorkflowInGroup(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/groups/workfow/`, formData,  { withCredentials: true });
  }


}
