import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, CONSULTATION_API_MICROSERVICE_URL } from '../../../constants/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentlyConsultService {

  apiUrl:string = API_URL
  apiConsultationMicroServiceUrl = CONSULTATION_API_MICROSERVICE_URL
  constructor(private http: HttpClient,) { }

  saveRecentlyConsultDocument(formData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/consult/recently-consult/`, formData, { withCredentials: true });
  }
  getRecentlyConsultDocument(): Observable<any> {
    return this.http.post(`${this.apiUrl}/consult/get-recently-consult/`,  { withCredentials: true });
  }

  // Enregistrer dans mongodb
  insertRecentlyConsultDocumentMicroservice(documentId: number,action:string): Observable<any> {
    return this.http.post(`${this.apiConsultationMicroServiceUrl}/consultation/insert-consultation`, {  documentId, action }, { withCredentials: true });
  }

  // recupere les 30 derniers consultations dans mongodb
  getRecentlyConsultDocumentMicroservice(documentId: number): Observable<any> {
    return this.http.post(`${this.apiConsultationMicroServiceUrl}/consultation/get-latest-consultations`, { documentId }, { withCredentials: true });
  }
}
