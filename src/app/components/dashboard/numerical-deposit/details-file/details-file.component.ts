import { Component } from '@angular/core';
import { FilemanagerService } from '../../../../services/api/filemanager/filemanager.service';
import { ActivatedRoute, Route } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { File_server_url } from '../../../../constants/constants';
import { UserService } from '../../../../services/api/user/user.service';
import { GlobalStateService } from '../../../../services/core/globalState/global-state.service';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';

@Component({
  selector: 'app-details-file',
  templateUrl: './details-file.component.html',
  styleUrl: './details-file.component.css'
})
export class DetailsFileComponent {

  isLoading: boolean = false
  detailsDocument: any
  docSrcBase : any = '';
  pdfSrc: any = ''
  zoom:number = 0.8
  users:any = []
  isFileLoading: boolean = false
  paths:any =[] 
  videoLink = ""
  link_video_server: string = File_server_url;
  link_nginx_server: string = File_server_url;
  isModalFullcreenDocumentOpen: boolean = false


  constructor(private fileManagerService:FilemanagerService,private route: ActivatedRoute,
    private userService: UserService, private globalStateService: GlobalStateService, private workflowService: WorkflowService){

  }
  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const idParam = params.get('id');
      if (idParam !== null) {
        const id = +idParam;
        console.log('ID récupéré de l\'URL :', id);

        this.fileManagerService.getDetailsDocumentById(id).subscribe({
          next: (response: any) => {
            this.isLoading = false;
            this.detailsDocument = response.details
            this.paths = response.paths
            this.setIdDocument(response.details.id)

            console.log('Réponse de l\'API:', response);

            if(this.isVideoExtension(response.details.extension)){

              // Remplacer les caractères d'échappement
                const normalizedUrl = response.details.file_link.replace(/\\/g, '/');

                this.videoLink = this.link_video_server+normalizedUrl+'?token='+response.details.token+'&id='+response.details.id;
            
                

            }else{

             

              this.workflowService.getDocumentFileByTask(response.details.id).subscribe({
                next: (response1: any) => {
                  
                  this.isFileLoading = false

                    let binary_string =  window.atob(response1.base64);

     
                    let len = binary_string.length;
                    let bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++)        {
                        bytes[i] = binary_string.charCodeAt(i);
                    }
         
                    this.pdfSrc = bytes.buffer;
          
                  // Ajoutez ici la gestion de la réponse de l'API
                },
                error: (error: any) => {
          
                  // Ajoutez ici la gestion des erreurs
                }
              });

            }

    
            // Ajoutez ici la gestion de la réponse de l'API
          },
          error: (error: any) => {
            
            console.error('Erreur lors de la requête vers l\'API:', error);
            // Ajoutez ici la gestion des erreurs
          }
        });
        // Faites ce que vous voulez avec l'ID récupéré


      } 
      // Faites ce que vous voulez avec l'ID récupéré


    });


  }
  isImageExtension(extension: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.svg', '.raw'];
    const lowerCaseExtension = extension.toLowerCase();
    return imageExtensions.includes(lowerCaseExtension);
  }

  isVideoExtension(extension: string): boolean {
    const imageExtensions = ['.mp4', '.avi',  '.webm'];
    const lowerCaseExtension = extension.toLowerCase();
    return imageExtensions.includes(lowerCaseExtension);
  }

  setZoom(action:string){
    if(action == "reduce"){
      this.zoom =  this.zoom - 0.1
    }else{
      this.zoom = this.zoom + 0.1
    }


  }

  getUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  setIdDocument(id: string) {
    this.globalStateService.setIdDocument(id);
  }

  setIsModalFullcreenDocumentOpen(){
    if(this.isModalFullcreenDocumentOpen){
      this.isModalFullcreenDocumentOpen = false
    }else{
      this.isModalFullcreenDocumentOpen = true
    }
  }
}
