import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  private baseUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient) { }

  convertWordToPdf(wordFile: File): Observable<Blob> {
    const formData: FormData = new FormData();
    formData.append('wordFile', wordFile, wordFile.name);

    return this.http.post(`${this.baseUrl}/convert`, formData, { responseType: 'blob' });
  }
}
