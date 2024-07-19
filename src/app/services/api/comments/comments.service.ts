import { Injectable } from '@angular/core';
import { API_URL } from '../../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }



  // Fonction pour envoyer le formulaire
  getComments(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/`, formData,  { withCredentials: true });
  }

  saveComments(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments/save/`, formData,  { withCredentials: true });
  }
}
