import { Component, ElementRef, EventEmitter, Inject, Input, Output, QueryList, ViewChildren, inject } from '@angular/core';
import mammoth from 'mammoth';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';
import { ApiService } from '../../../../services/api.service';
import { CourrierModeleService } from '../../../../services/api/courrier/modele-courrier/courriermodel.service';
import { CourrierService } from '../../../../services/api/courrier/courrier/courrier.service';
import { UserService } from '../../../../services/api/user/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { UploadFileService } from '../../../../services/api/uploadfile/uploadFiles.service';
@Component({
  selector: 'app-create-courrier',
  templateUrl: './create-courrier.component.html',
  styleUrl: './create-courrier.component.css'
})
export class CreateCourrierComponent {
  selected = 'Modèle par défaut';
  selectedPrio = "1";
  [x: string]: any;
  selectedOption: string = '';
  pdfSrc: SafeResourceUrl | string | Uint8Array   = '';
  array_buffer_pdfsrc: ArrayBuffer
  modeles: any[]; // Utilisation d'un tableau générique pour stocker les données
  selectedType: string = '';
  selectedModele: string = "";
  selectedModeleCourrierId: number = 0;
  selectedWorkflowId: number ;
  customer_fields: any[];
  modeleValue: any[];
  workflowList: any[];
  usersSelect: any[] = []
  workFlowName: string = ''
  extension: string = ''
  fieldValues: { id: number, value: string }[] = [];
  selectedAttachmentFiles :File[] = [];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords: any[] = [
    {name: 'Courrier'},
    {name: 'entrant'},
    {name: 'IGE'},
  ];
  announcer = inject(LiveAnnouncer);
  isFileLoading:boolean = false

  // Method to check if divsData is not empty






  selectedFile: File | null = null;
  document: Document | null = null;


  constructor(public dialog: MatDialog, private workflowService: WorkflowService,private uploadFileService:UploadFileService, private wordToPdfService: ApiService, private apiCourrierService: CourrierModeleService, private courrierService: CourrierService, private sanitizer: DomSanitizer, private fb: FormBuilder) { }

  // Utilisation d'un tableau générique pour stocker les données
  courrierForm: FormGroup;

  @ViewChildren('inputRef') inputRefs!: QueryList<ElementRef>;

  ngOnInit() {
    this.apiCourrierService.getModeleCourrier().subscribe(data => {
      this.modeles = data;
    });
    this.workflowService.getWorkFlow().subscribe(data => {
      this.workflowList = data;
    });


    this.courrierForm = this.fb.group({
      type: [''],
      modele: [''],
      subject: [''],
      priority: [''],
      date: [''],
      annotation: [''],
      closure_date: [null],
      recipient: [null],
      sender: [null],
      user: [1]
      // Add other form controls as needed
    }); 
    // Souscrire aux changements de la valeur du champ 'type'
    this.courrierForm.get('type')?.valueChanges.subscribe((newTypeValue) => {
      // Réinitialiser les champs lorsque 'type' change
      if (newTypeValue) {
        this.courrierForm.get('closure_date')?.setValue(null);
        this.courrierForm.get('recipient')?.setValue(null);
        this.courrierForm.get('sender')?.setValue(null);
      }
    });


    console.log('Form Controls:', this.courrierForm.controls);
  }

  onSubmit() {


    //this.uploadFileCourrier()

    //return 0

    const type = this.selectedModeleCourrierId == 0 ? this.courrierForm.value.type : ''
    let idUsers = this.usersSelect.map(user => user.id);
    const formData = new FormData();

    // Ajoute chaque champ de données à formData
    if(this.selectedModeleCourrierId != 0){
      formData.append('modele', this.selectedModeleCourrierId.toString());
    }

    for (let i = 0; i < this.selectedAttachmentFiles.length; i++) {
      formData.append('files', this.selectedAttachmentFiles[i]);
    }
    formData.append('type', type);
    formData.append('subject', this.courrierForm.value.subject);
    formData.append('priority', this.courrierForm.value.priority);
    formData.append('date', this.courrierForm.value.date);
    formData.append('closure_date', this.courrierForm.value.closure_date);
    formData.append('recipient', this.courrierForm.value.recipient);
    formData.append('sender', this.courrierForm.value.sender);
    formData.append('annotation', this.courrierForm.value.annotation);
    formData.append('last_annotation', this.courrierForm.value.annotation);
    if(this.extension == ".docx"){
      formData.append('file_base64', JSON.stringify(this.pdfSrc));
    }
    if(this.selectedWorkflowId){
      formData.append('workflow', this.selectedWorkflowId.toString());
   
    }
    if(idUsers.length >0){
     formData.append('customuser', JSON.stringify(idUsers));

    }
    if (this.selectedFile) {


        formData.append('file', this.selectedFile, this.selectedFile.name);
    }
/*     const data = {
      'modele': this.selectedModeleCourrierId,
      'type': type,
      'subject': this.courrierForm.value.subject,
      'priority': this.courrierForm.value.priority,
      'date': this.courrierForm.value.date,
      'closure_date': this.courrierForm.value.closure_date,
      'recipient': this.courrierForm.value.recipient,
      'sender': this.courrierForm.value.sender,
      'annotation': this.courrierForm.value.annotation,
      'last_annotation': this.courrierForm.value.annotation,
      'workflow':  idUsers.length <= 0 ||  this.selectedWorkflowId !== 0? this.selectedWorkflowId : null ,
      'customuser': idUsers.length > 0 ? idUsers : null,  // les user qui recoivent le courriern
      

    }; */


    this.courrierService.saveCourrier(formData).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API:', response);
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    });
    console.log('workflow', formData)
    this.fieldValues = [];
    this.inputRefs.forEach((inputRef, index) => {
      const field = this.customer_fields[index];
      const value = inputRef.nativeElement.value;
      this.fieldValues.push({ id: field.id, value });
    });

    console.log(this.fieldValues);
  }
  onSubmit1() {
    const submittedData = this.fieldValues.map(item => ({ id: item.id, value: item.value }));
    console.log(submittedData);
    /*     if (this.courrierForm.valid) {
          const formData = this.courrierForm.value;
    
          // Utilisez le service pour envoyer le formulaire
          this.courrierService.saveCourrier(formData).subscribe({
            next: (response) => {
              console.log('Réponse de l\'API:', response);
              // Ajoutez ici la gestion de la réponse de l'API
            },
            error: (error) => {
              console.error('Erreur lors de la requête vers l\'API:', error);
              // Ajoutez ici la gestion des erreurs
            }
          });
        }
        console.log(this.courrierForm.value); */
  }
  // On modele select change
  onSelectionChange(event: any) {
    const selectedMod = this.modeles.find(modele => modele.name === event.value);
    if (selectedMod) {
      this.selectedType = ''
      this.selectedModele = selectedMod.type;
      this.selectedModeleCourrierId = selectedMod.id
      console.log('Type correspondant:', selectedMod.id);
      this.courrierService.getFieldsByModele(selectedMod.id).subscribe(data => {
        this.customer_fields = data.fields;
      });
      console.log('correspondant:', this.selectedType);
      // Vous pouvez faire d'autres actions ici avec le type correspondant
    } else {
      this.selectedType = ''
      this.selectedModele = "";
      this.selectedModeleCourrierId = 0
    }
  }


  onFileSelected(event: Event) {
    this.isFileLoading=true
    let fileInput = event.target as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      let file = fileInput.files[0];
      this.selectedFile = fileInput.files[0]
      let reader = new FileReader();
      if (!this.isPdfFile(file)) {

        this.wordToPdfService.convertWordToPdf(file).subscribe(
          (pdfBlob: any) => {
            //this.pdfSrc = pdfBlob.pdf_base64;
            //this.pdfSrc = 'data:application/pdf;base64',pdfBlob.pdf_base64;
            this.extension = '.docx'
            let binary_string =  window.atob(pdfBlob.pdf_base64);
            let len = binary_string.length;
            let bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++)        {
                bytes[i] = binary_string.charCodeAt(i);
            }

            this.pdfSrc = bytes.buffer;
            this.isFileLoading = false
            //this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));

            // Gérez ici le téléchargement ou l'affichage du fichier PDF

          },
          error => {
            console.error('Erreur lors de la conversion :', error);
            this.isFileLoading = false
          }
        );

      }



      if (this.isPdfFile(file)) {

        let $pdf: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();

          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
            this.isFileLoading = false
          };

          reader.readAsArrayBuffer($pdf.files[0]);
        }

      }
    }



  }

  onFileAttachmentSelected(event: any): void {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedAttachmentFiles.push(files.item(i)!);
    }
  }

  removeFileAttachment(file: File): void {
    this.selectedAttachmentFiles = this.selectedAttachmentFiles.filter(f => f !== file);
  }

  removeFile() {
    this.pdfSrc = "";
  }
  isPdfFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.pdf');
  }
  isOfficeFile(file: File): boolean {
    return file.name.toLowerCase().endsWith('.doc') || file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.xlsx');
  }



  // Fonction pour ajouter ou mettre à jour les valeurs des champs de saisie
  updateFieldValue(id: number, value: string) {
    const index = this.fieldValues.findIndex(item => item.id === id);
    if (index !== -1) {
      // Mettre à jour la valeur si l'id existe déjà dans le tableau
      this.fieldValues[index].value = value;
    } else {
      // Ajouter une nouvelle entrée si l'id n'existe pas encore dans le tableau
      this.fieldValues.push({ id, value });
    }
  }




  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(keyword: any): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`Removed ${keyword}`);
    }
  }

  edit(keyword: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove keyword if it no longer has a name
    if (!value) {
      this.remove(keyword);
      return;
    }

    // Edit existing keyword
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords[index].name = value;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: { usersSelect: this.usersSelect }, // Passez usersSelect au dialogue
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result.name)

      // Vérifiez si un résultat a été renvoyé (l'ID)
      if (result) {
        // Utilisez l'ID dans CourrierComponent
        this.selectedWorkflowId = result.id;
        this.workFlowName = result.name;
        this.usersSelect = [];
        // Autres actions avec l'ID
      }
    });
  }

  addUserToSelect(user: any) {
    this.usersSelect.push(user); // Ajoute l'utilisateur à usersSelect
  }

  openDialogUser(): void {
    const dialogRef = this.dialog.open(UserContentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)

      // Vérifiez si un résultat a été renvoyé (l'ID)
      if (result) {
        this.usersSelect = [...this.usersSelect, ...result];
        this.workFlowName = ''
        this.selectedWorkflowId = 0
        // Utilisez l'ID dans CourrierComponent
        /*       this.selectedWorkflowId= result.id;
              this.workFlowName = result.name */
        // Autres actions avec l'ID
      }
    });
  }

  removeUser(id: number) {

        this.usersSelect = this.usersSelect.filter(item => item.id !== id);

}

uploadFileCourrier() {
  this.pdfSrc =""

  if (this.selectedFile) {

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.uploadFileService.SaveCourrierFile(formData).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API:', response);
        const blob = new Blob([response], { type: 'application/pdf' });
        
        this.pdfSrc = URL.createObjectURL(blob);
        // Ajoutez ici la gestion de la réponse de l'API
      },
      error: (error) => {
        console.error('Erreur lors de la requête vers l\'API:', error);
        // Ajoutez ici la gestion des erreurs
      }
    })

  }
}
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './modal-workfow.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],

})


export class DialogContentExampleDialog {

  workflowList: any[];
  workflowUser: any[];
  selectedIndex = -1;
  selectedId: number = 0;
  selectedName: string = ''
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogContentExampleDialog>, private workflowService: WorkflowService,) { }
  ngOnInit() {


    this.workflowService.getWorkFlow().subscribe(data => {
      this.workflowList = data;
    });
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

@Component({
  selector: 'dialog-content-user-dialog',
  templateUrl: './modal-user.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],

})
export class UserContentDialog {
  usersSelect: any[] = [];
  //usersSelect: any[] = []
  workflowUser: any[];
  selectedIndex = -1;
  selectedId: number = 0;
  selectedName: string = ''


  users: any[] = []; // Vos données d'utilisateurs
  selectedIds: number[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService, public dialog: MatDialog, public dialogRef: MatDialogRef<UserContentDialog>, private workflowService: WorkflowService,) { }
  ngOnInit() {

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }
  toggleSelection(id: number, name: string) {
    const isSelected = this.selectedIds.includes(id);
    if (isSelected) {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
      this.usersSelect = this.usersSelect.filter(item => item.id !== id);
    } else {
      this.selectedIds.push(id);
      this.usersSelect.push({ id: id, name: name })
    }
  }

  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }
  selectWorkflow(index: number, id: number, name: string) {
    this.selectedIndex = index; // Met à jour l'index sélectionné
    this.selectedId = id;
    this.selectedName = name;
    // Autres actions liées à la sélection du workflow par index
  }


  selectUser(index: number, id: number, name: string) {
    this.selectedIndex = index; // Met à jour l'index sélectionné
    this.selectedId = id;
    this.selectedName = name;
    // Autres actions liées à la sélection du workflow par index
  }
  addUser() {

    this.dialogRef.close(this.usersSelect);
  }
  closeDialog(): void {
    this.dialogRef.close(); // Ferme le dialogue et transmet l'ID à CourrierComponent
  }
  openDialog(): void {
  }
}
