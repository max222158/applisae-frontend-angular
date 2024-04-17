import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../../constants/constants';
@Injectable({
  providedIn: 'root'
})
export class CourrierModeleService {


  private apiUrl: string = API_URL;

  constructor(private http: HttpClient) { }
  getModeleCourrier(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/courriers/model-courriers/?format=json`,  { withCredentials: true });
  }


  saveModeleCourrier(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/courriers/save-modele/`, data,  { withCredentials: true });
  }

}
