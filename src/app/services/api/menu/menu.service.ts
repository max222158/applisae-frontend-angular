import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }

  // Fonction pour envoyer le formulaire




}
