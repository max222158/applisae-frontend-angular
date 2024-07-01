import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersSelectionService } from '../../../services/shared/user/users-selection.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent {

  @Input() user: any;
  @Output() checkboxChange = new EventEmitter<{ user: any, checked: boolean }>();

  isChecked$: Observable<boolean>;

  constructor(private userSelectionService: UsersSelectionService) {}
  @Input() name: string = '';
  initial: string = '';
  ngOnInit(): void {
    this.initial = this.name.charAt(0).toUpperCase();
    this.isChecked$ = this.userSelectionService.selectedUsers$.pipe(
      map(users => users.some(u => u.id === this.user.id))
    );
  }

  onCheckboxChange(event: any): void {
    const isChecked = event.target.checked;
    this.checkboxChange.emit({ user: this.user, checked: isChecked });
    if (isChecked) {
      this.userSelectionService.addUser(this.user);
    } else {
      this.userSelectionService.removeUser(this.user);
    }
  }
}
