import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CustomfieldService {
  private apiUrl: string = API_URL;

  constructor(private http: HttpClient) { }

  getFieldCustom(search:string, page:number): Observable<any[]> {

    let formData = new FormData()
    formData.append('searchText',search)
    formData.append('page',page.toString())
    return this.http.post<any[]>(`${this.apiUrl}/customs-field/?format=json`,formData,  { withCredentials: true });
  }


  saveFieldCustom(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-fiels/`, data);
  }

}
