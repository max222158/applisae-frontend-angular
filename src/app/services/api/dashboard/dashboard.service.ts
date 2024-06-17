import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl:string = API_URL
  constructor(private http: HttpClient,) { }




  getDataForDashboard(formData:any): Observable<any> {

    return this.http.post(`${this.apiUrl}/dashboard/`, formData, { withCredentials: true });
  }
}
