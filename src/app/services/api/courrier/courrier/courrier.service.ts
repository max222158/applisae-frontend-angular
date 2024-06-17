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

  getCourrierList(page:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list_courriers/?page=${page}&format=json`,{withCredentials:true});
  }
  getUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courriers/user/?format=json`,{withCredentials:true});
  }
    // Fonction pour envoyer le formulaire
    saveCourrier(formData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/courriers/save_courrier/`, formData,{withCredentials:true});
    }
    getDetailsCourrierById(id: number, page:number): Observable<any> {
      const formData = new FormData();
      formData.append('id', id.toString());  // Envoyer l'ID du modèle de courrier
  
      return this.http.post(`${this.apiUrl}/courriers/get_details_courrier/?page=${page}`, formData, { withCredentials: true });
    }

    getFileCourrierById(id: number): Observable<any> {
      const formData = new FormData();
      formData.append('id', id.toString());  // Envoyer l'ID du modèle de courrier
  
      return this.http.post(`${this.apiUrl}/courriers/get-file-courrier-by-id/`, formData, { withCredentials: true });
    }

    // Get the field of a modele courrier
    getFieldsByModele(modeleId: number): Observable<any> {
      const formData = new FormData();
      formData.append('modele_id', modeleId.toString());  // Envoyer l'ID du modèle de courrier
  
      return this.http.post(`${this.apiUrl}/courriers/get_model_by_courrier/`, formData, { withCredentials: true });
    }

    approvedDocument(id: number, approvation:boolean): Observable<any> {
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('approvation', approvation.toString());
      return this.http.post(`${this.apiUrl}/courriers/approve-document/`, formData,  { withCredentials: true });
    }
  
}