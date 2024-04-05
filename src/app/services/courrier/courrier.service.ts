import { Injectable } from '@angular/core';
import { API_URL } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourrierService {

  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }

  getCourrierList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list_courriers/?format=json`);
  }

    // Fonction pour envoyer le formulaire
    saveCourrier(formData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/save_courrier/`, formData);
    }
}
