import { ChangeDetectorRef, Component, EventEmitter, Input, Output, NgZone } from '@angular/core';

@Component({
  selector: 'app-modal-annotations',
  templateUrl: './modal-annotations.component.html',
  styleUrls: ['./modal-annotations.component.css']
})
export class ModalAnnotationsComponent {
  @Input() isOpenModalAnnotation: boolean = false;
  @Input() annotations: any[] = [];
  @Input() perPage: number = 10;
  @Input() page: number = 1;
  @Input() totalItems: number = 0;

  @Output() pageChangedEvent = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  closeModal() {
    this.isOpenModalAnnotation = false;
  }

  pageChanged(event: any) {
    this.ngZone.run(() => {
      this.page = event;
      this.pageChangedEvent.emit(this.page);
      this.cdr.detectChanges();
    });
  }
}
