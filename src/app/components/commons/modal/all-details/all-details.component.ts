import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-all-details',
  templateUrl: './all-details.component.html',
  styleUrl: './all-details.component.css'
})
export class AllDetailsComponent {

  @Input() isOpenModal:boolean = false


  closeModal(){
    this.isOpenModal = false
  }

}
