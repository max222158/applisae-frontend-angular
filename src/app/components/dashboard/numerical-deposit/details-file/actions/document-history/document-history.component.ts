import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-document-history',
  templateUrl: './document-history.component.html',
  styleUrl: './document-history.component.css'
})
export class DocumentHistoryComponent {
  @Input() isOpenModal:boolean = false
  @Input() histories:any[] = []
  @Output() pageChangedEvent = new EventEmitter<number>();
  @Input() perPage: number ;
  @Input() page:number;

  @Input() totalItemsHistory: number;

  @Output() closeModalEvent = new EventEmitter<void>();

    closeModal() {
      this.closeModalEvent.emit();
    }
    pageChanged(event: any) {
      this.pageChangedEvent.emit(event);
    }
}
