import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrl: './all-details.component.css'
})
export class AllDetailsComponent {

  @Input() isOpenModal:boolean = false
  @Input() details:any = {}


  @Output() closeModalEvent = new EventEmitter<void>();

    closeModal() {
      this.closeModalEvent.emit();
    }
}
