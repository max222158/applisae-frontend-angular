import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkflowService } from '../../../../services/api/workflow/workflow.service';
import { AnnotationService } from '../../../../services/api/annotation/annotation.service';

@Component({
  selector: 'app-modal-annotations',
  templateUrl: './modal-annotations.component.html',
  styleUrl: './modal-annotations.component.css'
})
export class ModalAnnotationsComponent {

  constructor(private annotationService: AnnotationService) {}


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

    this.isSpinnerLoading = true
    this.saveAnnotationEvent.emit(textAnnotation);

  }
  checkTextAnnotation() {
    this.isTextAnnotationEmpty = !this.textAnnotation || this.textAnnotation.trim().length === 0;
  }
  @Input() alertMessage: string;

  ngOnChanges() {
    if (this.alertMessage) {
      this.textAnnotation = ''
      this.isSpinnerLoading = false
      this.isTextAnnotationEmpty = true
    }
  }
}
