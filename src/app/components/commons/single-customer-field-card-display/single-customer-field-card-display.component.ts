import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CustomerFieldsSelectionService } from '../../../services/shared/customer-fields/customer-fields.service';

@Component({
  selector: 'app-single-customer-field-card-display',
  templateUrl: './single-customer-field-card-display.component.html',
  styleUrl: './single-customer-field-card-display.component.css'
})
export class SingleCustomerFieldCardDisplayComponent {
    
  @Input() field: any;
  @Output() checkboxChange = new EventEmitter<{ field: any, checked: boolean }>();

  isChecked$: Observable<boolean>;

  constructor(private customerFielsSelectionService: CustomerFieldsSelectionService) {}

  ngOnInit(): void {

    this.isChecked$ = this.customerFielsSelectionService.selectedfields$.pipe(
      map(fields => fields.some(u => u.id === this.field.id))
    );
  }

  onCheckboxChange(event: any): void {
    const isChecked = event.target.checked;
    this.checkboxChange.emit({ field: this.field, checked: isChecked });
    if (isChecked) {
      this.customerFielsSelectionService.addField(this.field);
    } else {
      this.customerFielsSelectionService.removeField(this.field);
    }
  }

}
