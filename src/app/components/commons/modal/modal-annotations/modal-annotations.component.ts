import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';
import { AnnotationService } from '../../../../services/api/annotation/annotation.service';
import { Editor } from 'ngx-editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-annotations',
  templateUrl: './modal-annotations.component.html',
  styleUrl: './modal-annotations.component.css'
})
export class ModalAnnotationsComponent implements OnInit, OnDestroy{

  constructor(private annotationService: AnnotationService,private sanitizer: DomSanitizer) {}


  @Input() isOpenModalAnnotation: boolean = false;
  @Input() annotations: any[] = [];
  @Input() perPage: number ;
  @Input() page:number;
  @Input() writeAnnotation:boolean = false
  @Input() totalItems: number;
  @Output() pageChangedEvent = new EventEmitter<number>();
  @Output() saveAnnotationEvent = new EventEmitter<string>();
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() saveSuccessEvent = new EventEmitter<void>();
  textAnnotation: string = ''
  isSpinnerLoading:boolean = false
  isTextAnnotationEmpty:boolean = true
  sanitizedAnnotations: { [key: string]: SafeHtml } = {};
  @Input() notifySuccessSaveNotification: string;
  @Input() isNotifyPaginationAnnotation: string;
  
  editor: Editor;

  ngOnInit(): void {
    this.editor = new Editor();
    this.sanitizeAnnotations()
  }



  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  closeModal() {
    this.closeModalEvent.emit();
  }


  pageChanged(event: any) {
    this.pageChangedEvent.emit(event);
  }

  setWriteAnnotation(){
    if(this.writeAnnotation == true){
      this.writeAnnotation = false
    }else{
      this.writeAnnotation = true
    }

  }

  SaveAnnotation(textAnnotation:string){
    if(this.textAnnotation == '' || this.textAnnotation == '<p></p>'){

      alert("Ajouter une annotation: le champ annotation ne peut pas être vide!")

    }else{
      this.isSpinnerLoading = true
      this.saveAnnotationEvent.emit(textAnnotation);
    }


  }
  checkTextAnnotation() {
    this.isTextAnnotationEmpty = !this.textAnnotation || this.textAnnotation.trim().length === 0;
  }
  @Input() alertMessage: string;

/*   ngOnChanges() {

    if (this.annotations) {
      this.sanitizeAnnotations();
      alert(12)
    }
    if (this.alertMessage) {
      this.textAnnotation = ''
      this.isSpinnerLoading = false
      this.isTextAnnotationEmpty = true
    }
  } */


  ngOnChanges(changes: SimpleChanges) {
    if (changes['notifySuccessSaveNotification']) {
      this.onParentFunctionExecuted();
    }
    if (changes['isNotifyPaginationAnnotation']) {

      this.sanitizeAnnotations()
    }
  }

  onParentFunctionExecuted() {
    this.isTextAnnotationEmpty = true
    this.isSpinnerLoading = false
    this.textAnnotation = ''
    console.log('Parent function executed. Data received:', this.notifySuccessSaveNotification);
  }

  sanitizeAnnotations() {
    this.sanitizedAnnotations = {};
    this.annotations.forEach(details => {
      this.sanitizedAnnotations[details.id] = this.sanitizer.bypassSecurityTrustHtml(details.annotation);
    });
  }

}
