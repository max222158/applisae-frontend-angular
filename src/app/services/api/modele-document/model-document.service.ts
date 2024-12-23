import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DocumentModeleService {


  private apiUrl: string = API_URL;

  constructor(private http: HttpClient) { }
  getModeleDocument(formData:any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/model/model-document/?format=json`, formData ,  { withCredentials: true });
  }


  saveModeleDocument(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/model/save-modele-document/`, data,  { withCredentials: true });
  }

}
