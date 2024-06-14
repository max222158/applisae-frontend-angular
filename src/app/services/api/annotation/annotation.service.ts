import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }


      // Fonction pour envoyer le formulaire
      saveAnnotation(formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/courriers/save-annotation/`, formData,{withCredentials:true});
      }


      saveDocumentAnnotation(formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/file-manager/save-annotation-document/`, formData,{withCredentials:true});
      }


      getAnnotationPagination(formData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/file-manager/paginate-annotation/`, formData,{withCredentials:true});
      }
}
