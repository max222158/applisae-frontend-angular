import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrl: './modal-alert.component.css'
})
export class ModalAlertComponent {
  @Input() isOpenModal: boolean = false;
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() textButtonValidation: string = "";
  @Input() icon: string = "";
  @Input() color: string = "";
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() validationEvent = new EventEmitter<void>();


  closeModal() {
    this.closeModalEvent.emit();
  }

  validation() {
    this.validationEvent.emit();
  }

}
