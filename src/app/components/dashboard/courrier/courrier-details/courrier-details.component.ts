import { ChangeDetectorRef, Component } from '@angular/core';
import { CourrierService } from '../../../../services/api/courrier/courrier/courrier.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl } from '@angular/platform-browser';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';
import { File_server_url } from '../../../../constants/constants';
import { AnnotationService } from '../../../../services/api/annotation/annotation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courrier-details',
  templateUrl: './courrier-details.component.html',
  styleUrl: './courrier-details.component.css'
})
export class CourrierDetailsComponent {
  subject: string;
  annotation: string
  annotations: any[] = []
  email: string
  name: string
  date: string
  courrierId: string | null
  page: number = 1
  perPage: number = 10
  totalItems: any = 0
  courrier: any = null
  messageBlock: boolean = false
  textResponseButton = "Répondre"
  isLoading = true
  disabled = true
  user_or_workflow: boolean = false
  isFileLoading: boolean = true
  pdfsource: SafeResourceUrl | string | Uint8Array = '';
  workflow: any = []
  users:any = []
  position_in_workflow:number = 1
  class_modal_attachment_file = "modal"
  isOpenModalAttachmentFile:boolean = false
  isOpenModalAnnotation:boolean = false
  attachment_file: any = [] 
  isOpenModalHistoriqueVersion: boolean = false
  pdfSrc: any = ''
  zoom: number = 0.7
  
  link_video_server: string = File_server_url;
  link_nginx_server: string = File_server_url
  isModalFullcreenDocumentOpen: boolean = false
  // Remplacez par vos données
  annotationPerPage: number = 10;
  pageAnnotation: number = 1;
  totalItemsAnnotation: number = 0;
  annotationsInModal:any = []
  last_annotation:any = null
  textButtonValidation: string = ''
  iconModal: string = ''
  colorIcon: string = ''
  approvedOrReject: string = ''
  titleModal: string = ""
  isModalApproveRejectOpen: boolean = false
  notifySuccessAnnotation: string;
  isVote:boolean 
  notifySuccessSaveNotification: any
  isNotifyPaginationAnnotation: any
  isModalDocumentClassificationOpen:boolean = false
  attachmentFileSelect:string = ''
  isModalReadSingle:boolean = false
  extensionAttachmentFileSelect:string = ''
  attachmentDocumentId:number;



  setNotifySuccessAnnotation() {
    this.notifySuccessAnnotation = 'This is an alert from the parent component!';
  }
  

  setSuccessSaveNotification() {
    this.notifySuccessSaveNotification = { timestamp: new Date() };
    console.log('Function executed in parent');
  }

  
  notifyPaginationAnnotation() {
    this.isNotifyPaginationAnnotation = { timestamp: new Date() };
    console.log('Function executed in parent');
  }


  constructor(private courrierService: CourrierService,private toastr: ToastrService, private annotationService:AnnotationService, private workflowService: WorkflowService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {


    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.subject = history.state.subject;
        this.annotation = history.state.annotation;
        this.email = history.state.email;
        this.name = history.state.name;
        this.date = history.state.date
        console.log(this.subject);
        this.cdr.detectChanges(); // Force change detection
      });
  }

  ngOnInit(): void {
    this.isFileLoading = true
    this.route.queryParams.subscribe(params => {
      this.courrierId = this.route.snapshot.paramMap.get('id');

      console.log(this.courrierId)
      if (this.courrierId) {
        this.courrierService.getDetailsCourrierById(parseInt(this.courrierId), this.page).subscribe((data: any) => {
          console.log(data)

          this.courrier = data.results
          this.position_in_workflow = data.results.position_in_workflow
  
          if(data.results.hasOwnProperty('vote')){
         
            console.log(data.results.vote)
            this.isVote = data.results.vote

    
          }
          // Spécifiez le type 'any' pour les données
          console.log(this.pdfsource);
          this.annotations = data.results.annotations
          
          this.attachment_file = data.results.attachment_file
          this.totalItems = data.count;
          this.last_annotation = data.results.annotations[0]
          this.notifyPaginationAnnotation()
          if (data.results.workflow !== null) {
            this.workflowService.getUserInWorkflow(data.results.workflow).subscribe({
              next: (data) => {



                
                this.workflow = data.workflow;
                // Ajoutez ici la gestion de la réponse de l'API
              },
              error: (error) => {
                console.error('Erreur lors de la requête vers l\'API:', error);
                // Ajoutez ici la gestion des erreurs
              }
            })
          }else{

            this.workflowService.getUsersCourrier(data.results.customuser).subscribe({
              next: (data) => {

                this.users = data;


                
                // Ajoutez ici la gestion de la réponse de l'API
              },
              error: (error) => {
                console.error('Erreur lors de la requête vers l\'API:', error);
                
                // Ajoutez ici la gestion des erreurs
              }
            })


          }
          //this.message = data;
        });


        // Fetcher le fichier principal du courrier pdf ou autres



        this.courrierService.getFileCourrierById(parseInt(this.courrierId)).subscribe((data: any) => {
          this.isFileLoading = false
          if (data.base64) {


            let binary_string = window.atob(data.base64);
            let len = binary_string.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binary_string.charCodeAt(i);
            }

            this.pdfSrc = bytes.buffer;
            this.isFileLoading = false
          }
        });
      }
      // Utilisez courrierId dans votre logique de détails de courrier
    });





  }

  getCourrierDetailsById(){

    console.log(this.courrierId)
    if (this.courrierId) {
      this.courrierService.getDetailsCourrierById(parseInt(this.courrierId), this.page).subscribe((data: any) => {
        console.log(data)

        this.courrier = data.results
        this.position_in_workflow = data.results.position_in_workflow

        if(data.results.hasOwnProperty('vote')){
       
          console.log(data.results.vote)
          this.isVote = data.results.vote

  
        }
        // Spécifiez le type 'any' pour les données
        console.log(this.pdfsource);
        this.annotations = data.results.annotations
        this.attachment_file = data.results.attachment_file
        this.totalItems = data.count;
        this.last_annotation = data.results.annotations[0]
        if (data.results.workflow !== null) {
          this.workflowService.getUserInWorkflow(data.results.workflow).subscribe({
            next: (data) => {



              
              this.workflow = data.workflow;
              // Ajoutez ici la gestion de la réponse de l'API
            },
            error: (error) => {
              console.error('Erreur lors de la requête vers l\'API:', error);
              // Ajoutez ici la gestion des erreurs
            }
          })
        }else{

          this.workflowService.getUsersCourrier(data.results.customuser).subscribe({
            next: (data) => {

              this.users = data;


              
              // Ajoutez ici la gestion de la réponse de l'API
            },
            error: (error) => {
              console.error('Erreur lors de la requête vers l\'API:', error);
              
              // Ajoutez ici la gestion des erreurs
            }
          })


        }
        //this.message = data;
      });


      // Fetcher le fichier principal du courrier pdf ou autres



      this.courrierService.getFileCourrierById(parseInt(this.courrierId)).subscribe((data: any) => {
        this.isFileLoading = false
        if (data.base64) {


          let binary_string = window.atob(data.base64);
          let len = binary_string.length;
          let bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
          }

          this.pdfSrc = bytes.buffer;
          this.isFileLoading = false
        }
      });
    }

  }
  fetchAnnotation() {
    if (this.courrierId) {
      this.courrierService.getDetailsCourrierById(parseInt(this.courrierId), this.page).subscribe((data: any) => { // Spécifiez le type 'any' pour les données
        console.log(data.results);
        this.annotations = data.results.annotations
        this.totalItems = data.count
        this.notifyPaginationAnnotation()
        

        //this.message = data;
      });
    }
  }


  
  saveAnnotation(event:string){

    let formData = new FormData()
    formData.append('annotationText',event)
    formData.append('last_version_id', this.courrier.last_version_id)
    if(this.courrierId){
      formData.append('courrier_id', this.courrierId.toString())
    }

    this.annotationService.saveAnnotation(formData).subscribe({
      next: (data) => {

        
        this.toastr.success('Vous avez ajouté une annotation!','Annotation');
        this.setSuccessSaveNotification()
        let newAnnotation = data.annotation

        this.annotations.unshift(newAnnotation);
        this.notifyPaginationAnnotation()
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error) => {
        
        this.toastr.error('Erreur lors de l\'enregistrement!','Erreur');
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.setSuccessSaveNotification()
        
        
        // Ajoutez ici la gestion des erreurs
      }
    })
  }

  pageChanged(event: any) {
    this.page = event;
    console.log(event)
    this.fetchAnnotation();
  }





  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentDetailsDialog, {
      data: { detailsCourrier: this.courrier }, // Passez usersSelect au dialogue
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  closeWorkflow_or_user_view(view: boolean) {
    this.user_or_workflow = view

  }
  onpenAttachment(){
    if(this.isOpenModalAttachmentFile == false){
      this.isOpenModalAttachmentFile = true;
    }else{
      this.isOpenModalAttachmentFile = false;
    }
  }
  openAnnotationModal(){
    
      this.isOpenModalAnnotation = true;

  }
  closeAnnotationModal(){
    
    this.isOpenModalAnnotation = false;

}

closeModalReaderDocument(){
    
  this.isModalReadSingle = false;

}

closeModalDocumentClassification(){
    
  this.isModalDocumentClassificationOpen = false;

}

  openHistoriqueVersionModal(){
    if(this.isOpenModalHistoriqueVersion == false){
      this.isOpenModalHistoriqueVersion = true;
    }else{
      this.isOpenModalHistoriqueVersion = false;
    }
  }

  
  openModalReaderDocument(extension:string, nameDoc:string, idAttachmentFile:number) {
    this.attachmentFileSelect = nameDoc
    this.attachmentDocumentId = idAttachmentFile
    this.extensionAttachmentFileSelect = extension
    this.isModalReadSingle = true
  }

  openModalDocumentClassification(){
    
    this.isModalDocumentClassificationOpen = true;

}


  
  onFileSelected(event: Event) {
    this.pdfSrc = ''
    this.isFileLoading = true
    let fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {

      let file = fileInput.files[0];

      let reader = new FileReader();



  }
}

setIsModalFullcreenDocumentOpen(){
  if(this.isModalFullcreenDocumentOpen){
    this.isModalFullcreenDocumentOpen = false
  }else{
    this.isModalFullcreenDocumentOpen = true
  }
}



closeModal() {
  this.isOpenModalAnnotation = false;
}
closeModalApprove() {
  this.isModalApproveRejectOpen = false
}


setisModalApproveRejectOpen(value: string) {

  if (value == "approved") {
    this.titleModal = "Voulez-vous vraiment approuver cette tâche?"
    this.iconModal = "fa-solid fa-circle-check"
    this.textButtonValidation = "Approuver"
    this.colorIcon = "green"
    this.approvedOrReject = "approved"

  } else {
    this.titleModal = "Voulez-vous rejeter cette tâche"
    this.iconModal = "fa-solid fa-circle-xmark"
    this.textButtonValidation = "Rejeter"
    this.colorIcon = "red"
    this.approvedOrReject = "reject"
  }

  if (this.isModalApproveRejectOpen) {
    this.isModalApproveRejectOpen = false
  } else {
    this.isModalApproveRejectOpen = true
  }
}

approuveReject() {

  let approved = false;
  if (this.approvedOrReject == "approved") {
    approved = true
  }
  if (this.approvedOrReject == "reject") {
    approved = false
  }


  if (this.courrierId) {
    this.courrierService.approvedDocument(parseInt(this.courrierId), approved).subscribe({
      next: (response: any) => {

        

        this.isModalApproveRejectOpen = false;

        this.getCourrierDetailsById()
        //this.getInfoTaskById() 
        this.closeModal()
 
      },
      error: (error: any) => {

        // Ajoutez ici la gestion des erreurs
      }
    });

  }



}


}


@Component({
  selector: 'dialog-content-details-dialog',
  templateUrl: './modal-details.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],

})


export class DialogContentDetailsDialog {

  workflowList: any[];
  workflowUser: any[];
  selectedIndex = -1;
  selectedId: number = 0;
  selectedName: string = ''
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogContentDetailsDialog>) { }
  ngOnInit() {


  }
  selectWorkflow(index: number, id: number, name: string) {
    this.selectedIndex = index; // Met à jour l'index sélectionné
    this.selectedId = id;
    this.selectedName = name;
    // Autres actions liées à la sélection du workflow par index
  }

  closeDialog(): void {
    this.dialogRef.close({ 'id': this.selectedId, 'name': this.selectedName }); // Ferme le dialogue et transmet l'ID à CourrierComponent
  }
  openDialog(): void {
  }




}
