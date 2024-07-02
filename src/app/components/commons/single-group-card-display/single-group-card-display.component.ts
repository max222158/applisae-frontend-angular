import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GroupesSelectionService } from '../../../services/shared/user/groupes-selection.service';

@Component({
  selector: 'app-single-group-card-display',
  templateUrl: './single-group-card-display.component.html',
  styleUrl: './single-group-card-display.component.css'
})
export class SingleGroupCardDisplayComponent {


  
  @Input() group: any;
  @Output() checkboxChange = new EventEmitter<{ group: any, checked: boolean }>();

  isChecked$: Observable<boolean>;

  constructor(private groupSelectionService: GroupesSelectionService) {}

  ngOnInit(): void {

    this.isChecked$ = this.groupSelectionService.selectedGroupes$.pipe(
      map(groups => groups.some(u => u.id === this.group.id))
    );
  }

  onCheckboxChange(event: any): void {
    const isChecked = event.target.checked;
    this.checkboxChange.emit({ group: this.group, checked: isChecked });
    if (isChecked) {
      this.groupSelectionService.addGroupe(this.group);
    } else {
      this.groupSelectionService.removeGroupe(this.group);
    }
  }
}
