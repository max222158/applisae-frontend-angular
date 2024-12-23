import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  x = 0;
  y = 0;
  display = 'none';
  @Input() idParsed:number

  @Input() folderName:string
   
  @Output() renameModalEvent = new EventEmitter<{id:number, folderName:string}>();

  onRightClick(event: MouseEvent): void {
    event.preventDefault();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;
    this.x = event.clientX + scrollX;
    this.y = event.clientY + scrollY;
    this.display = 'block';
  }

  onOptionClick(option: string): void {
    console.log(option);
    this.display = 'none';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.display = 'none';
  }

  renameModal(id:number, folderName:string) {
    this.renameModalEvent.emit({id, folderName});


  }
}
