import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import mammoth from 'mammoth';
import { ApiService } from '../../../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';
import { CourrierService } from '../../../services/api/courrier/courrier/courrier.service';
import { CourrierModeleService } from '../../../services/api/courrier/modele-courrier/courriermodel.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WorkflowService } from '../../../services/api/workflow/workflow.service';
import { CommonModule } from '@angular/common';

interface ModeleValue {
  label: string;
  type: string;
}

@Component({
  selector: 'app-courrier',
  templateUrl: './courrier.component.html',
  styleUrl: './courrier.component.css'
})
export class CourrierComponent {
  selected = 'Modèle par défaut';
  selectedPrio = "Normale";
  [x: string]: any;
  selectedOption: string = '';
  pdfSrc: SafeResourceUrl | string = '';
  modeles: any[]; // Utilisation d'un tableau générique pour stocker les données
  selectedType: string;
  selectedModele: string = "";
  customer_fields:any [];
  modeleValue: any [];
  workflowList: any[];

 fieldValues: { id: number, value: string }[] = [];

  // Method to check if divsData is not empty






  selectedFile: File | null = null;
  document: Document | null = null;


  constructor(public dialog: MatDialog, private workflowService: WorkflowService, private wordToPdfService: ApiService, private apiCourrierService: CourrierModeleService, private courrierService: CourrierService, private sanitizer: DomSanitizer, private fb: FormBuilder) { }

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

  onSubmit()  {
    console.log('workflow', this.workflowList)

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
      this.selectedModele = selectedMod.type;
      console.log('Type correspondant:', selectedMod.id);
      this.courrierService.getFieldsByModele(selectedMod.id).subscribe(data => {
        this.customer_fields = data.fields;
      });
      console.log('correspondant:', this.customer_fields);
      // Vous pouvez faire d'autres actions ici avec le type correspondant
    }else{
      this.selectedModele ="";
    }
  }


  onFileSelected(event: Event) {
    let fileInput = event.target as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      let file = fileInput.files[0];
      let reader = new FileReader();
      if (this.isOfficeFile(file)) {

        this.wordToPdfService.convertWordToPdf(file).subscribe(
          (pdfBlob: Blob) => {
            this.pdfSrc = URL.createObjectURL(pdfBlob);
            //this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(pdfBlob));

            // Gérez ici le téléchargement ou l'affichage du fichier PDF

          },
          error => {
            console.error('Erreur lors de la conversion :', error);
          }
        );

      }



      if (this.isPdfFile(file)) {

        let $pdf: any = document.querySelector('#file');

        if (typeof (FileReader) !== 'undefined') {
          let reader = new FileReader();

          reader.onload = (e: any) => {
            this.pdfSrc = e.target.result;
          };

          reader.readAsArrayBuffer($pdf.files[0]);
        }

      }
    }



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

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './modal-workfow.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],

})


export class DialogContentExampleDialog {

  workflowList :any[];
  workflowUser: any[];
  selectedIndex = -1; 
  constructor(public dialog: MatDialog, private workflowService: WorkflowService,) {}
  ngOnInit() {
 

    this.workflowService.getWorkFlow().subscribe(data => {
      this.workflowList = data;
    });
  }
  selectWorkflow(index: number, id: number) {
    this.selectedIndex = index; // Met à jour l'index sélectionné

    // Autres actions liées à la sélection du workflow par index
  }
  openDialog(): void {
  }

}
