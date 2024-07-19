import { Component, EventEmitter, Input, Output } from '@angular/core';
import { handleDocumentFileResponse, isVideoExtension } from '../../../helpers/helper';
import { FilemanagerService } from '../../../services/api/filemanager/filemanager.service';
import { File_server_url } from '../../../constants/constants';

@Component({
  selector: 'app-reader-document',
  templateUrl: './reader-document.component.html',
  styleUrl: './reader-document.component.css'
})
export class ReaderDocumentComponent {

  constructor(private fileManagerService: FilemanagerService,){

  }
  @Input() extension: string = '';
  _documentId: number;

  @Input() isOpenModal: boolean = false;

  pdfSrc: any = '' 
  videoLink:string = ''
  isVideo: boolean = false
  @Input() zoom:number = 0.7 
  @Input() fileName:string = ''

  @Input() documentType:string = ''
  
  @Input() isCommentOpen:boolean = false
  

  @Input()
  set documentId(value: number) {
    this._documentId = value;
    this.onDocumentIdChange(value);
  }

  link_video_server: string = File_server_url;
  link_nginx_server: string = File_server_url;

  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal() {
    this.isCommentOpen = false
    this.closeModalEvent.emit();
  }


  private onDocumentIdChange(value: number) {
    // Actions à effectuer lorsque l'extension change
    console.log(`Id: ${value}`);
    if(value){

      
      if(!isVideoExtension(this.extension)){
        this.isVideo = false
        this.fetchDocumentFile(value)
      }else{
        this.pdfSrc = ""
        this.isVideo = true

        this.getDocumentDetailsById(value)

      }

    }

    // Ajoutez ici tout autre traitement nécessaire
  }


  private fetchDocumentFile(documentId: number): void {
    this.pdfSrc = ''
    const formData = new FormData();
    formData.append('id', documentId.toString());
    if(this.documentType == '' || this.documentType == undefined){

      this.fileManagerService.getDocumentFile(formData).subscribe({
        next: (response: any) => {
          this.pdfSrc =  handleDocumentFileResponse(response);
        },
        error: (error: any) => {
          // Ajoutez ici la gestion des erreurs
        }
      });

    }else{

      // Si attachment document est courrier u un task
      formData.append('type',this.documentType)
      this.fileManagerService.displayAttachmentFileById(formData).subscribe({
        next: (response: any) => {
          this.pdfSrc =  handleDocumentFileResponse(response);
        },
        error: (error: any) => {
          // Ajoutez ici la gestion des erreurs
        }
      });


    }

  }

  getDocumentDetailsById(value:number){
    this.fileManagerService.getDetailsDocumentById(value).subscribe({
      next: (response: any) => {
        
        const normalizedUrl = response.details.file_link.replace(/\\/g, '/');
        this.videoLink = this.link_video_server + normalizedUrl + '?token=' + response.details.token + '&id=' + response.details.id;
  
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  setZoom(action: string) {
    if (action == "reduce") {
      this.zoom = this.zoom - 0.1
    } else {
      this.zoom = this.zoom + 0.1
    }


  }

  openComment(){
    this.isCommentOpen = !this.isCommentOpen
  }
}