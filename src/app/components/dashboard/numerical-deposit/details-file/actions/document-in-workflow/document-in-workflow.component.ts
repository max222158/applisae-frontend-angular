import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-document-in-workflow',
  templateUrl: './document-in-workflow.component.html',
  styleUrl: './document-in-workflow.component.css'
})
export class DocumentInWorkflowComponent {
  @Input() isOpenModal:boolean = false
  @Input() workflows:any[] = []


  @Output() closeModalEvent = new EventEmitter<void>();

    closeModal() {
      this.closeModalEvent.emit();
    }
}
