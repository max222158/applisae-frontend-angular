import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { File_server_url } from '../../../../../constants/constants';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../../../services/api/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { WorkflowService } from '../../../../../services/api/workflow/workflow.service';
import { clearInput } from '../../../../../helpers/helper';
import { UtilsService } from '../../../../../services/core/utils/utils.service';
import { GlobalStateService } from '../../../../../services/core/globalState/global-state.service';
import { FilemanagerService } from '../../../../../services/api/filemanager/filemanager.service';
import { ApiService } from '../../../../../services/api.service';


@Component({
  selector: 'app-details-workflow',
  templateUrl: './details-workflow.component.html',
  styleUrl: './details-workflow.component.css'
})
export class DetailsWorkflowComponent {
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute, private wordToPdfService: ApiService, private fileManagerService: FilemanagerService, private globalStateService: GlobalStateService, private utilsService: UtilsService, private workflowService: WorkflowService, private fb: FormBuilder, private userService: UserService, private toastr: ToastrService) { }

  workflow_name: any;
  isLoading: boolean = false
  isSpinnerLoading: boolean = false
  isOpenModalUser: boolean = false
  isOpenModalGroupUser: boolean = false
  disabled: boolean = true
  detailsDocument: any
  docSrcBase: any = '';
  query: string = '';
  pdfSrc: any = ''
  zoom: number = 0.7
  workflowForm: FormGroup
  link_video_server: string = File_server_url;
  link_nginx_server: string = File_server_url
  users: any[] = [];
  usersSelect: any[] = []
  groupSelect: any[] = []
  groupUser: any[] = []
  selectedAttachmentFiles: File[] = [];
  type: number = 0
  idDocument: number;
  isFileLoading: boolean = false
  selectedFile: File | null = null;
  extension: string = ''
  fileName: string = "";
  isModalFullcreenDocumentOpen: boolean = false



  ngOnInit() {

    // ID du document a initialiser avec ce workflow
    this.idDocument = parseInt(this.globalStateService.getIdDocument(), 10);
    this.routeSubscription = this.route.params.subscribe(params => {
      let workflow = params['workflow'];

      if (workflow == "creer-un-nouveau-workflow") {
        this.workflow_name = "Créer un nouveau workflow"
        this.type = 1
        this.workflowForm.get('type')?.setValue(1);
      }
      if (workflow == "reviser-et-approuver-en-groupe") {
        this.workflow_name = "Réviser et approuver en groupe"
        this.type = 2
        this.workflowForm.get('type')?.setValue(2);

      }
      if (workflow == "reviser-et-approuver-en-groupe-lecture-seulement") {
        this.workflow_name = "Réviser et approuver en groupe Lecture uniquement"
        this.type = 3
        this.workflowForm.get('type')?.setValue(3);

      }
      if (workflow == "modele-par-defaut") {
        this.workflow_name = "Modèle par défaut"
        this.type = 4
        this.workflowForm.get('type')?.setValue(4);

      }

      if (workflow == "reviser-et-approuver-par-plusieurs-utilisateurs") {
        this.workflow_name = "Réviser et approuver par plusieurs utilisateurs"
        this.type = 5
        this.workflowForm.get('type')?.setValue(5);

      }
      // Faites quelque chose avec paramValue
    });


    this.workflowForm = this.fb.group({
      name: [''],
      description: [''],
      priority: 1,
      percentage_approval: 50,
      date_cloture: [''],
      type: this.type

      // Add other form controls as needed
    });

    this.workflowForm.get('type')?.valueChanges.subscribe(value => {
      this.onTypeChange(value);
    });

    this.getGroup("")
    this.getUsers("")
    if (!Number.isNaN(this.idDocument)) {
      alert(this.idDocument)

      this.getDocumentById()

    }

  }

  getDocumentById() {
    this.isFileLoading = true
    this.workflowService.getDocumentFileByTask(this.idDocument).subscribe({
      next: (response: any) => {
        
        this.isFileLoading = false
        console.log(response)


          let binary_string =  window.atob(response.base64);
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
  onSubmit() {


    let name = this.workflowForm.value.name
    let description = this.workflowForm.value.description
    let date_cloture = this.workflowForm.value.date_cloture
    let priority = this.workflowForm.value.priority
    let percentage_approval = this.workflowForm.value.percentage_approval

    console.log(name, '-', description, '-', date_cloture, '-', priority, '-', percentage_approval)

    if (this.usersSelect.length > 0 || this.groupSelect.length > 0) {
      if (this.workflow_name == "Réviser et approuver par plusieurs utilisateurs") {

      } else {


      }
      const formatData = new FormData();
      
      const formData = {
        name: this.workflowForm.value.name,
        type: this.type,
        description: this.workflowForm.value.description,
        percentage_approval: this.workflowForm.value.percentage_approval,
        priority: this.workflowForm.value.priority,
        date_cloture: this.workflowForm.value.date_cloture,
        user_workflow: this.usersSelect.map(user => ({
          id: user.id
        })),
        groupe: this.groupSelect.map(groupe => ({
          id: groupe.id
        })),
        attachment_file: [],
        document_id: this.idDocument
      }


      console.log(formData)
      formatData.append('details', JSON.stringify(formData))
      if (this.selectedFile) {


        formatData.append('file', this.selectedFile, this.selectedFile.name);
      }

      

      for (let i = 0; i < this.selectedAttachmentFiles.length; i++) {
        formatData.append('files_attachment', this.selectedAttachmentFiles[i]);
      }
      this.isSpinnerLoading = true
      this.disabled = true
      this.workflowService.saveWorkFlow(formatData).subscribe({
        next: (response: any) => {
          this.isLoading = false;

          this.toastr.success('Enregistré avec succès!', 'Workflow');
          console.log('Réponse de l\'API:', response);
          this.disabled = true
          this.isSpinnerLoading = false
          clearInput(this.workflowForm, ['name', 'description']);
          this.groupSelect = []
          this.usersSelect = []
          this.selectedAttachmentFiles = []
          this.selectedFile = null
          this.workflowForm.get('priority')?.setValue(1);
          this.workflowForm.get('date_cloture')?.setValue('');

          this.pdfSrc = ''
          this.fileName = ''
          // Ajoutez ici la gestion de la réponse de l'API
        },
        error: (error: any) => {
          this.isLoading = false;
          this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');
          console.error('Erreur lors de la requête vers l\'API:', error);
          this.isSpinnerLoading = false
          this.disabled = false
          // Ajoutez ici la gestion des erreurs
        }
      });
    }

  }

  openUserModal() {

    if (this.isOpenModalUser == false) {
      this.isOpenModalUser = true
    } else {
      this.isOpenModalUser = false
    }



  }

  openGroupUserModal() {

    if (this.isOpenModalGroupUser == false) {
      this.isOpenModalGroupUser = true
    } else {
      this.isOpenModalGroupUser = false
    }



  }

  onUsersSelectChange(updatedUsersSelect: any[]) {
    this.usersSelect = updatedUsersSelect;
    if (this.groupSelect.length > 0 || this.usersSelect.length > 0) {
      if (this.selectedFile || this.pdfSrc !== '') {

        this.disabled = false
      }
    }

    if (this.groupSelect.length <= 0 && this.usersSelect.length <= 0) {
      this.disabled = true
    }
    console.log('Updated usersSelect:', this.usersSelect);
  }

  onGroupSelectChange(updatedUsersSelect: any[]) {
    this.groupSelect = updatedUsersSelect;
    if (this.groupSelect.length > 0 || this.usersSelect.length > 0) {
      if (this.selectedFile || this.pdfSrc !== '') {
        this.disabled = false
      }
    }

    if (this.groupSelect.length <= 0 && this.usersSelect.length <= 0) {
      this.disabled = true
    }

    console.log('Updated groupSelectChange:', this.groupSelect);
  }

  getGroup(query: string): void {
    this.userService.getGroupsSearch(1, query).subscribe({
      next: (data: any) => {
        this.groupUser = data.results;  // Assumes the response includes a 'results' array


        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');
        this.isLoading = false
        // Ajoutez ici la gestion des erreurs
      }
    });
  }

  getUsers(query: string) {
    query = this.query
    this.userService.getUsersSearch(1, query).subscribe({
      next: (data: any) => {
        this.users = data.results;  // Assumes the response includes a 'results' array
        console.log(data.results)

        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error: any) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        this.toastr.error('Lors de l\'enregistrement! Veuillez réésayer', 'Erreur');
        this.isLoading = false
        // Ajoutez ici la gestion des erreurs
      }
    });
  }
  onTypeChange(value: string): void {
    this.groupSelect = [];
    this.usersSelect = [];
    this.disabled = true
    clearInput(this.workflowForm, ['name']);
    let newSegment = '';

    switch (value) {
      case '1':
        console.log(value);
        this.workflow_name = "Créer un nouveau workflow";
        this.type = 1;
        newSegment = 'creer-un-nouveau-workflow';
        break;
      case '2':
        console.log(value);
        this.workflow_name = "Réviser et approuver en groupe";
        this.type = 2;
        newSegment = 'reviser-et-approuver-en-groupe';
        break;
      case '3':
        console.log(value);
        this.workflow_name = "Réviser et approuver en groupe Lecture uniquement";
        this.type = 3;
        newSegment = 'reviser-et-approuver-en-groupe-lecture-seulement';
        break;
      case '4':
        console.log(value);
        this.workflow_name = "Modèle par défaut";
        this.type = 4;
        newSegment = 'modele-par-defaut';
        break;
      case '5':
        console.log(value);
        this.workflow_name = "Réviser et approuver par plusieurs utilisateurs";
        this.type = 5;
        newSegment = 'reviser-et-approuver-par-plusieurs-utilisateurs';
        break;
      default:
        console.log(value);
        break;
    }

    // Modifier le segment de l'URL
    if (newSegment) {
      this.utilsService.modifyUrlSegment(newSegment);
    }
  }
  onInputSearchValueChange(newValue: string) {

    this.query = newValue;
  }
  removeUser(id: number) {

    this.usersSelect = this.usersSelect.filter(item => item.id !== id);

  }



  ///// Document upload from local machine /////////


  onFileSelected(event: Event) {
    this.pdfSrc = ''
    this.isFileLoading = true
    let fileInput = event.target as HTMLInputElement;
    this.idDocument = NaN
    if (fileInput && fileInput.files && fileInput.files.length > 0) {

      let file = fileInput.files[0];
      this.fileName = file.name
      this.selectedFile = fileInput.files[0];
      let reader = new FileReader();

      if (!this.isPdfFile(file)) {

        this.wordToPdfService.convertWordToPdf(file).subscribe(
          (pdfBlob: any) => {
            //this.pdfSrc = pdfBlob.pdf_base64;
            //this.pdfSrc = 'data:application/pdf;base64',pdfBlob.pdf_base64;
            this.extension = '.docx'
            let binary_string = window.atob(pdfBlob.pdf_base64);
            let len = binary_string.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
              bytes[i] = binary_string.charCodeAt(i);
            }

            this.pdfSrc = bytes.buffer;
            this.isFileLoading = false

            //  Activer le button Submit
            if (this.pdfSrc !== '') {

              if (this.groupSelect.length > 0 || this.usersSelect.length > 0) {

                this.disabled = false

              }

            }
          },
          error => {
            console.error('Erreur lors de la conversion :', error);
            this.isFileLoading = false
          }
        );

      } else if (this.isPdfFile(file)) {

        let $pdf: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();

          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.isFileLoading = false
          };

          reader.readAsArrayBuffer($pdf.files[0]);


          //  Activer le button Submit

        }


      }


      //  Activer le button Submit


      if (this.groupSelect.length > 0 || this.usersSelect.length > 0) {

        this.disabled = false

      }




    } else {

      this.isFileLoading = false
      this.pdfSrc = ''
      this.disabled = true
      this.fileName = ''
    }




  }

  isPdfFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.pdf');
  }



  onAttachementFilesSelected(files: File[]): void {
    this.selectedAttachmentFiles = files;
  }

  setIsModalFullcreenDocumentOpen(){
    if(this.isModalFullcreenDocumentOpen){
      this.isModalFullcreenDocumentOpen = false
    }else{
      this.isModalFullcreenDocumentOpen = true
    }
  }


}
