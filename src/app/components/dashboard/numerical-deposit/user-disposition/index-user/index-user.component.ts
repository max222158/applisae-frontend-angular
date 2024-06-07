import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-index-user',
  templateUrl: './index-user.component.html',
  styleUrl: './index-user.component.css'
})
export class IndexUserComponent {
  @Input() disposition: string;
  @Output() folder = new EventEmitter<{ id: number, name: string }>();



  openHomeUserFolder(id: number, name: string) {
    this.folder.emit({ id, name });
  }
}
