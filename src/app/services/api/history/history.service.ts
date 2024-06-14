import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  apiUrl:string = API_URL
  constructor(private http: HttpClient,) { }

  getHistory(filterBy: string, page: number): Observable<any> {
    const formData = new FormData();
    formData.append('filterBy', filterBy);  // Envoyer l'ID du modèle de courrier
    formData.append('page', page.toString());
    return this.http.post(`${this.apiUrl}/history/list-history/`, formData, { withCredentials: true });
  }

  saveHistory(history: string): Observable<any> {
    const formData = new FormData();
    formData.append('history', history);  // Envoyer l'ID du modèle de courrier
    return this.http.post(`${this.apiUrl}/history/save-history/`, formData, { withCredentials: true });
  }



  saveHistoryForDocument(formData:any): Observable<any> {
  // Envoyer l'ID du modèle de courrier
    return this.http.post(`${this.apiUrl}/history/save-history-for-document/`, formData, { withCredentials: true });
  }

  
}
