import { Component, HostListener, Input } from '@angular/core';

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
}
