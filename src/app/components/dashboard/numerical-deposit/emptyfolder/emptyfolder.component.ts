import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-emptyfolder',
  templateUrl: './emptyfolder.component.html',
  styleUrl: './emptyfolder.component.css'
})
export class EmptyfolderComponent {
  @Output() fileChanged = new EventEmitter<FileList>();

  onFileChange(event: Event) {

      this.fileChanged.emit();
    
  }
}
