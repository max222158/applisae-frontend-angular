import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-fields-modal',
  templateUrl: './customer-fields-modal.component.html',
  styleUrl: './customer-fields-modal.component.css'
})
export class CustomerFieldsModalComponent {

  @Input() fields:any[] = []

  onSearch(){
    
  }

}
