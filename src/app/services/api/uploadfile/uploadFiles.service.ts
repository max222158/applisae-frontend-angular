import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }

    // Fonction pour envoyer le formulaire
    SaveCourrierFile(formData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/courriers/save_file/`, formData,{withCredentials:true});
    }

}