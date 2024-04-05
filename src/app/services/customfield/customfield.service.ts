import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomfieldService {
  private apiUrl: string = API_URL;

  constructor(private http: HttpClient) { }

  getFieldCustom(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customs-field/?format=json`);
  }
}
