import { Component } from '@angular/core';
import { FilemanagerService } from '../../../../services/api/filemanager/filemanager.service';
import { ActivatedRoute, Route } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { File_server_url } from '../../../../constants/constants';
import { UserService } from '../../../../services/api/user/user.service';
import { GlobalStateService } from '../../../../services/core/globalState/global-state.service';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AnnotationService } from '../../../../services/api/annotation/annotation.service';
import { HistoryService } from '../../../../services/api/history/history.service';

@Component({
  selector: 'app-details-file',
  templateUrl: './details-file.component.html',
  styleUrl: './details-file.component.css'
})
export class DetailsFileComponent {

  isLoading: boolean = false
  detailsDocument: any
  docSrcBase: any = '';
  pdfSrc: any = ''
  zoom: number = 0.8
  versionDocument:number
  users: any = []
  isFileLoading: boolean = false
  paths: any = []
  videoLink = ""
  link_video_server: string = File_server_url;
  link_nginx_server: string = File_server_url;
  isModalFullcreenDocumentOpen: boolean = false
  isModalAllDetailsOpen: boolean = false
  isModalEditMetadataOpen: boolean = false
  isOpenModalAnnotation: boolean = false
  isModalDocumentInWorkflowOpen: boolean = false
  isModalHistoryOpen: boolean = false
  isModalNewVersionDocumentOpen: boolean = false
  annotations: any = []
  workflows: any = []
  annotationPerPage: number = 20;
  pageAnnotation: number = 1;
  totalItemsAnnotation: number = 0;
  currentAnnotationPage: number = 1
  document_id: number
  isVote: boolean
  /* 
    Notifie si le une variable change dans le composant enfant notifySuccessAnnotation
     */
  notifySuccessEditMetaData: any;
  notifySuccessSaveNewVersion: any;


  setNotifySuccessEditMetaData() {
    this.notifySuccessEditMetaData = { timestamp: new Date() };
    console.log('Function executed in parent');
  }

  setNotifySuccessNewVersionSave() {
    this.notifySuccessSaveNewVersion = { timestamp: new Date() };
    console.log('Function executed in parent');
  }
  /*   ----------------------------------fin-----------------------
   */
  constructor(private fileManagerService: FilemanagerService, private route: ActivatedRoute, private toastr: ToastrService
    , private userService: UserService, private history: HistoryService, private annotationService: AnnotationService, private globalStateService: GlobalStateService, private workflowService: WorkflowService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.document_id = id;
        console.log('ID récupéré de l\'URL :', id);

        this.fileManagerService.getDetailsDocumentById(id).subscribe({
          next: (response: any) => {
            this.handleDocumentDetailsResponse(response);
          },
          error: (error: any) => {
            console.error('Erreur lors de la requête vers l\'API:', error);
            // Ajoutez ici la gestion des erreurs
          }
        });
      }
    });
  }

  private handleDocumentDetailsResponse(response: any): void {
    this.isLoading = false;
    this.detailsDocument = response.details;
    this.annotations = response.details.annotations;
    this.paths = response.paths;
    this.workflows = response.details.workflows;
    this.setIdDocument(response.details.id);
    this.totalItemsAnnotation = response.count;
    this.versionDocument = response.version

    console.log('Réponse de l\'API:', response);

    if (this.isVideoExtension(response.details.extension)) {
      const normalizedUrl = response.details.file_link.replace(/\\/g, '/');
      this.videoLink = this.link_video_server + normalizedUrl + '?token=' + response.details.token + '&id=' + response.details.id;
    } else {

      if(response.details.hasOwnProperty('last_version_document')){

        let path = response.details.last_version_document.document_link

        this.fetchLastVersionDocument(path)

      }else{

        // Fetch the first version of document

        this.fetchDocumentFile(response.details.id);
      }
  

    }
  }

  private fetchDocumentFile(documentId: number): void {

    const formData = new FormData();
    formData.append('id', documentId.toString());

    this.fileManagerService.getDocumentFile(formData).subscribe({
      next: (response: any) => {
        this.handleDocumentFileResponse(response);
      },
      error: (error: any) => {
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  private fetchLastVersionDocument(path:string): void {
    const formData = new FormData();
    formData.append('path_document', path);

    this.fileManagerService.getDocumentFile(formData).subscribe({
      next: (response: any) => {
        this.handleDocumentFileResponse(response);
      },
      error: (error: any) => {
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  private handleDocumentFileResponse(response: any): void {
    this.isFileLoading = false;
    const binaryString = window.atob(response.base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    this.pdfSrc = bytes.buffer;
    // Ajoutez ici la gestion de la réponse de l'API
  }


  isImageExtension(extension: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.svg', '.raw'];
    const lowerCaseExtension = extension.toLowerCase();
    return imageExtensions.includes(lowerCaseExtension);
  }

  isVideoExtension(extension: string): boolean {
    const imageExtensions = ['.mp4', '.avi', '.webm'];
    const lowerCaseExtension = extension.toLowerCase();
    return imageExtensions.includes(lowerCaseExtension);
  }

  setZoom(action: string) {
    if (action == "reduce") {
      this.zoom = this.zoom - 0.1
    } else {
      this.zoom = this.zoom + 0.1
    }


  }

  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  setIdDocument(id: string) {
    this.globalStateService.setIdDocument(id);
  }

  setIsModalFullcreenDocumentOpen() {
    if (this.isModalFullcreenDocumentOpen) {
      this.isModalFullcreenDocumentOpen = false
    } else {
      this.isModalFullcreenDocumentOpen = true
    }
  }

  setIsModalAllDetailsOpen() {
    if (this.isModalAllDetailsOpen) {
      this.isModalAllDetailsOpen = false
    } else {
      this.isModalAllDetailsOpen = true
    }
  }

  closeModalAllDetailsOpen() {

    this.isModalAllDetailsOpen = false


  }

  closeModalDocumentInWorkflowOpen() {

    this.isModalDocumentInWorkflowOpen = false


  }

  closeModalNewVersion() {

    this.isModalNewVersionDocumentOpen = false


  }

  setModalNewVersionDocumentOpen() {

    this.isModalNewVersionDocumentOpen = true


  }

  setIsModalEditMetadataOpen() {

    this.isModalEditMetadataOpen = true

  }

  setIsModalDocumentInWorkflowOpen() {

    this.isModalDocumentInWorkflowOpen = true

  }

  closeModalEditMetadataOpen() {
    this.isModalEditMetadataOpen = false
  }


  /**
   * Modifies the metadata of a document in the digital archive.
   * @param event An object containing the new title and description for the document.
   */
  onEditMetadata(event: { title: string, description: string }) {
    console.log('Edited Details:', event);

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('document_id', this.detailsDocument.id);

    this.fileManagerService.EditMetadaDocument(formData).subscribe({
      next: (response: any) => {
        this.setNotifySuccessEditMetaData();
        this.toastr.success('Metadata has been saved successfully');
      },
      error: (error: any) => {
        this.toastr.error('Error while saving metadata');
        console.error('Error in API request:', error);
        // Add error handling here
      }
    });
  }



  /**
   * Fetches a paginated list of annotations for a specific document from the server.
   * Updates the component's state with the fetched data.
   */
  fetchAnnotation(): void {
    const formData = new FormData();
    formData.append('document_id', this.document_id.toString());
    formData.append('page', this.currentAnnotationPage.toString());

    this.annotationService.getAnnotationPagination(formData).subscribe({
      next: (data) => {
        this.annotations = data.results;
        // Handle API response here
      },
      error: (error) => {

        console.error('Error making API request:', error);
        // Handle errors here
      }
    });
  }


  /* 
    Lorsque la pagination des annotation du document change
    
    */
  currentAnnotationPageChanged(event: any) {
    this.currentAnnotationPage = event;
    this.fetchAnnotation()

  }

  openAnnotationModal() {

    this.isOpenModalAnnotation = true;

  }

  openHistoryModal() {

    this.isModalHistoryOpen = true;

  }

  closeAnnotationModal() {

    this.isOpenModalAnnotation = false;

  }

  closeHistoryModal() {

    this.isModalHistoryOpen = false;

  }


  saveAnnotation(event: string) { // Specify the type of event if possible

    let formData = new FormData();
    formData.append('annotationText', event);

    if (this.document_id) {
      formData.append('document_id', this.document_id.toString());
    }

    this.annotationService.saveDocumentAnnotation(formData).subscribe({
      next: (data) => {
        this.handleSaveAnnotationSuccess("Annotation enregistrée");
      },
      error: (error) => {
        this.handleSaveAnnotationError();
      }
    });
  }

  private handleSaveAnnotationSuccess(message: string) {
    this.toastr.success(message, 'Succès');
    // Additional success handling logic can be added here
  }

  private handleSaveAnnotationError() {
    this.toastr.error('Erreur lors de l\'enregistrement!', 'Erreur');
    console.error('Erreur lors de la requête vers l\'API:');
    // Additional error handling logic can be added here
  }


  /**
   * Saves a new version of the document by sending the selected file and its description to the server.
   * 
   * @param $event An object containing the selected file and its description.
   * @returns void
   */

  saveNewVersion($event: any) {


    let formData = new FormData()
    formData.append('file', $event.selectedFile, $event.selectedFile.name)
    formData.append('description', $event.description)
    formData.append('document_id', this.document_id.toString())

    this.history.saveHistoryForDocument(formData).subscribe({
      next: (data) => {
        this.handleSaveAnnotationSuccess('La version a été ajouté avec succès');
        this.setNotifySuccessNewVersionSave()
      },
      error: (error) => {
        this.handleSaveAnnotationError();
      }
    });




  }

}
