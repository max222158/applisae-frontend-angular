import { Component } from '@angular/core';
import mammoth from 'mammoth';
import { ApiService } from '../../../services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CourrierService } from '../../../services/courrier/courrier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-courrier',
  templateUrl: './courrier.component.html',
  styleUrl: './courrier.component.css'
})
export class CourrierComponent {
  [x: string]: any;
  selectedOption: string = '';
  pdfSrc: SafeResourceUrl | string = ''; 



  selectedFile: File | null = null;
  document: Document | null = null;

  constructor(private wordToPdfService: ApiService,private  courrierService:CourrierService, private sanitizer: DomSanitizer,private fb: FormBuilder) { }
 // Utilisation d'un tableau générique pour stocker les données
 courrierForm: FormGroup;



 ngOnInit() {
   this.courrierForm= this.fb.group({
    type: [''],
    modele: [''],
    subject: [''],
    priority: [''],
    date: [''],
    closure_date: [null],
    recipient: [null],
    sender: [null],
    user:[1]
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
  if (this.courrierForm.valid) {
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
   console.log(this.courrierForm.value);
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


  
}

