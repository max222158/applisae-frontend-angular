import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-fields',
  templateUrl: './customer-fields.component.html',
  styleUrl: './customer-fields.component.css'
})
export class CustomerFieldsComponent {

  @Input() customer_fields:any[]
  @Input() selectedModele:string


}
