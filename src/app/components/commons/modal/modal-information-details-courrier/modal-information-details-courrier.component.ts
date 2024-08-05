import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-information-details-courrier',
  templateUrl: './modal-information-details-courrier.component.html',
  styleUrl: './modal-information-details-courrier.component.css'
})
export class ModalInformationDetailsCourrierComponent {

  @Input() isOpenModal: boolean = true;
  @Input() courrier: any = {};

  @Output() closeModalEvent = new EventEmitter<void>();


  closeModal() {
    this.closeModalEvent.emit();
  }


}
