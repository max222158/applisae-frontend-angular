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
    return this.http.post(`${this.apiUrl}/workflow/document/save-workflow/`, formData,  { withCredentials: true });
  }


  saveModelWorkFlow(formData: any): Observable<any> {
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


  getTaskWorkflowByUser(page: number,filter:string): Observable<any> {
    const formData = new FormData();
    formData.append('page', page.toString());
    formData.append('filterBy', filter);
    return this.http.post(`${this.apiUrl}/workflow/get-task/`, formData,  { withCredentials: true });
  }

  getDetailsTaskById(id: number, task: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('task', task.toString());
    return this.http.post(`${this.apiUrl}/workflow/get-task-id/`, formData,  { withCredentials: true });
  }


  getDocumentFileByTask(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.http.post(`${this.apiUrl}/workflow/get-document-file-id/`, formData,  { withCredentials: true });
  }

  
  setIsTaskRead(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.http.post(`${this.apiUrl}/workflow/set-task-is-read/`, formData,  { withCredentials: true });
  }

  approvedWorkflowTask(id: number, approvation:boolean): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('approvation', approvation.toString());
    return this.http.post(`${this.apiUrl}/workflow/approve-task/`, formData,  { withCredentials: true });
  }

  closeWorkflow(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.http.post(`${this.apiUrl}/workflow/close-worflow/`, formData,  { withCredentials: true });
  }
}
