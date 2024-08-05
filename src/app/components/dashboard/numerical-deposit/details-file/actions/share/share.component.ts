import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.css'
})
export class ShareComponent {
  @Input() isOpenModal:boolean = false
  @Input() details:any = {}
  @Input() link: string = ''


  @Output() closeModalEvent = new EventEmitter<void>();

    closeModal() {
      this.closeModalEvent.emit();
    }

}
