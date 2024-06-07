import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { WorkflowService } from '../../../../../../services/api/workflow/workflow.service';
import { File_server_url } from '../../../../../../constants/constants';
import { filter } from 'rxjs';
import { UtilsService } from '../../../../../../services/core/utils/utils.service';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrl: './details-task.component.css'
})
export class DetailsTaskComponent {

  constructor(private workflowService: WorkflowService, public utilsService: UtilsService, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {

  }
  workflowId: string | null = '0'

  taskId: string | null = '0'
  zoom: number = 0.9
  detailstask: any = {}
  titleModal: string = ""
  pdfSrc: any = ''
  link_video_server: string = File_server_url;
  link_nginx_server: string = File_server_url
  documentId: number
  isFileLoading: boolean = true
  isModalApproveRejectOpen: boolean = false
  isModalFullcreenDocumentOpen: boolean = false
  textButtonValidation: string = ''
  iconModal: string = ''
  colorIcon: string = ''
  approvedOrReject: string = ''
  isWorkfowApprouved: boolean
  isWorkfowCloture: boolean
  isWorkfowExpired: boolean
  ngOnInit() {
    this.getInfoTaskById()



  }
  getInfoTaskById() {
    if (this.workflowId) {
      this.route.queryParams.subscribe(params => {
        this.workflowId = this.route.snapshot.paramMap.get('id');
        this.taskId = this.route.snapshot.paramMap.get('task');


        console.log(this.workflowId)
        if (this.workflowId && this.taskId) {
          this.workflowService.getDetailsTaskById(parseInt(this.workflowId), parseInt(this.taskId)).subscribe((data: any) => {
            console.log(data)

            this.detailstask = data
            this.documentId = data.document



            this.setIsTaskRead()


            if (data.workflow_expired !== undefined) {
              this.isWorkfowExpired = true
            }



            if (data.workflow_is_approve !== undefined) {

              this.isWorkfowApprouved = true
            } else {
              this.isWorkfowApprouved = false

            }


            if (data.is_workflow_close !== undefined) {

              this.isWorkfowCloture = true
            }

            // DOIT ETRE EN DERNIER LIEUX

            this.getDocumentFileByTask()

            //this.message = data;
          });


        }
        // Utilisez workflowId dans votre logique de détails de courrier
      });
    }
  }


  getDocumentFileByTask() {

    this.workflowService.getDocumentFileByTask(this.documentId).subscribe({
      next: (response: any) => {

        this.isFileLoading = false
        console.log(response)


        let binary_string = window.atob(response.base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
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

  setIsTaskRead() {

    //alert(this.detailstask.task_details.read)
    if (this.taskId) {

      if (!this.detailstask.task_details.read) {
        this.workflowService.setIsTaskRead(parseInt(this.taskId)).subscribe({
          next: (response: any) => {




            // Ajoutez ici la gestion de la réponse de l'API
          },
          error: (error: any) => {

            // Ajoutez ici la gestion des erreurs
          }
        });
      }
    }
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

  setIsModalFullcreenDocumentOpen() {
    if (this.isModalFullcreenDocumentOpen) {
      this.isModalFullcreenDocumentOpen = false
    } else {
      this.isModalFullcreenDocumentOpen = true
    }
  }
  setZoom(action: string) {
    if (action == "reduce") {
      this.zoom = this.zoom - 0.1
    } else {
      this.zoom = this.zoom + 0.1
    }


  }

  closeModal() {
    this.isModalApproveRejectOpen = false
  }

  approuveReject() {

    let approved = false;
    if (this.approvedOrReject == "approved") {
      approved = true
    }
    if (this.approvedOrReject == "reject") {
      approved = false
    }


    if (this.taskId) {
      this.workflowService.approvedWorkflowTask(parseInt(this.taskId), approved).subscribe({
        next: (response: any) => {


          let percentageNumberOfVote: number = 1

          const percentage = this.utilsService.calculatePercentage(this.detailstask.user_in_workflow).toString();
          const parsedPercentage = parseInt(percentage, 10); // Ensure this is a number

          if (!isNaN(parsedPercentage) && this.detailstask.user_in_workflow.length > 0) {
            percentageNumberOfVote = parsedPercentage + (1 / this.detailstask.user_in_workflow.length) * 100;

            if (percentageNumberOfVote >= parseInt(this.detailstask.percentage_approval, 10) && this.workflowId) {

              // Cloturer le workflow si le pourcentage requi est aquis
              this.workflowService.closeWorkflow(parseInt(this.workflowId)).subscribe({
                next: (response: any) => {

                  alert("Ce worklow a été cloturé")
                  this.getInfoTaskById()
                  this.closeModal()
                  return 0
                  // Ajoutez ici la gestion de la réponse de l'API
                },
                error: (error: any) => {

                  // Ajoutez ici la gestion des erreurs
                }
              });

            }

          } else {

          }

          this.getInfoTaskById() 
          this.closeModal()
          console.error('Invalid percentage or user_in_workflow length');
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {

          // Ajoutez ici la gestion des erreurs
        }
      });

    }



  }




  closeWorkflow() {

    if (this.workflowId) {
      this.workflowService.closeWorkflow(parseInt(this.workflowId)).subscribe({
        next: (response: any) => {

          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {

          // Ajoutez ici la gestion des erreurs
        }
      });


    }
  }






}
