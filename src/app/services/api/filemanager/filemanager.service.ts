import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../../constants/constants';
import { Observable, map, switchMap } from 'rxjs';
import { CsrfcookieService } from '../../core/utils/csrfcookie.service';

@Injectable({
  providedIn: 'root'
})
export class FilemanagerService {

  private apiUrl: string = API_URL;

  constructor(private http: HttpClient,private csrfTokenService:CsrfcookieService) { }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': "SaLeWYtT2l2OgeKvFQC68OrBuvliKqvh"
    })
  };
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/csrf/`);
}

// Dans votre méthode où vous envoyez la requête POST
getFolderById1(id: number): Observable<any> {
    return this.getCsrfToken().pipe(
        switchMap(csrfToken => {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                })
            };

            console.log("csrfToken = = = ",csrfToken)
            return this.http.post(`${this.apiUrl}/file-manager/list-folder-by-id/`, id, httpOptions);
        })
    );
}
  createFolder(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/file-manager/create-folder/`, data,{withCredentials:true});
  }

  getFolderById(id: number,page:number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('page', page.toString());
    return this.http.post(`${this.apiUrl}/file-manager/list-folder-by-id/`, formData,{withCredentials:true });
  }


  getFolderAndFlesById(formData:any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/list-folder-by-id/`, formData,{withCredentials:true });
  }
  getUserFolderByNameCategory(category: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/list-folder-by-user-category/`, category,{withCredentials:true });
  }

  getDetailsDocumentById(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());  // Envoyer l'ID du modèle de courrier

    return this.http.post(`${this.apiUrl}/file-manager/get_details_document/?id=${id}`, formData, { withCredentials: true });
  }
  
  uploadFile(formData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/file-manager/upload-multiple-files/`, formData,{withCredentials:true,reportProgress: true,
      observe: 'events'});
  }

  getFileDocumentById(id: number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());  // Envoyer l'ID du modèle de courrier

    return this.http.post(`${this.apiUrl}/file-manager/get-file-by-id/`, formData, { withCredentials: true });
  }


  copyFiles(formData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/file-manager/copy-file/`, formData,{withCredentials:true});
  }

  moveFileAndFolder(formData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/file-manager/move-files-folders/`, formData,{withCredentials:true});
  }
  deleteFileFolder(formData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/file-manager/delete-file/`, formData,{withCredentials:true});
  }


  EditMetadaDocument(formData:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/file-manager/edit-metadata/`, formData,{withCredentials:true});
  }
  getDetailsCourrierById(id: number, page:number): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());  // Envoyer l'ID du modèle de courrier

    return this.http.post(`${this.apiUrl}/courriers/get_details_courrier/?page=${page}`, formData, { withCredentials: true });
  }


  getDocumentFile(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/get-file-document/`, formData,  { withCredentials: true });
  }
  
  sendListFilesAndFolder(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/send-list-files-and-folder/`, formData,  { withCredentials: true });
  }

  getAllVersionsByDocumentId(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/all-version-document/`, formData,  { withCredentials: true });
  }



  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(this.apiUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          if (event.total !== undefined) {
            const progress = Math.round(100 * event.loaded / event.total);
            return { status: 'progress', message: progress };
          } else {
            return { status: 'progress', message: 'Calculating...' };
          }

        case HttpEventType.Response:
          return { status: 'done', message: event.body };

        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

  sendPermissionListFilesAndFolder(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/add-permission-folder-document/`, formData,  { withCredentials: true });
  }
  getPermissionUsersGroupsByFolderId(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/get-permission-folder-users-group/`, formData,  { withCredentials: true });
  }

  getSingleDetailsFolderById(formData: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/file-manager/get-single-details-folder/`, formData,  { withCredentials: true });
  }
}
