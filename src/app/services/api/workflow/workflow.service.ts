import { Injectable } from '@angular/core';
import { API_URL } from '../../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowService {

  private apiUrl: string = API_URL;



  constructor(private http: HttpClient) { }


  saveWorkFlow(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/workflow/save-workflow/`, formData,  { withCredentials: true });
  }

  getWorkFlow(): Observable<any> {

    return this.http.get<any[]>(`${this.apiUrl}/workflow/get-workflow/?format=json`,  { withCredentials: true });
  }

  getUserInWorkflow(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.http.post(`${this.apiUrl}/workflow/get-users/`, formData,  { withCredentials: true });
  }

  getUsersCourrier(users: any): Observable<any> {
    const formData = new FormData();
    formData.append('users', JSON.stringify(users));
    return this.http.post(`${this.apiUrl}/workflow/get-users-courriers/`, formData,  { withCredentials: true });
  }
}
