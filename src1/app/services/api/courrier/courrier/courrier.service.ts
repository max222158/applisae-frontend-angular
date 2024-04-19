import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../../constants/constants';

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

    // Get the field of a modele courrier
    getFieldsByModele(modeleId: number): Observable<any> {
      const formData = new FormData();
      formData.append('modele_id', modeleId.toString());  // Envoyer l'ID du modèle de courrier
  
      return this.http.post(`${this.apiUrl}/courriers/get_model_by_courrier/`, formData, { withCredentials: true });
    }
}