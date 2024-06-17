import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-details-modal',
  templateUrl: './all-details-modal.component.html',
  styleUrl: './all-details-modal.component.css'
})
export class AllDetailsModalComponent {

  @Input() isOpenModal:boolean = false
  @Input() details:any = {}


  closeModal(){
    this.isOpenModal = false
  }

}
