import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  private baseUrl = 'http://localhost:8000/api'; 

  constructor(private http: HttpClient) { }

  convertWordToPdf(wordFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', wordFile, wordFile.name);

    return this.http.post(`${this.baseUrl}/convert/`, formData,{withCredentials:true});
  }
}
