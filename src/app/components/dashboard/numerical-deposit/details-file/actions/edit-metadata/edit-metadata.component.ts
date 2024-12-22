import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { AppState } from '../../../../../../state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCustomersFieldsByModelResponse } from '../../../../../../state/selectors/customers-fields/customers-fields.selectors';
import { getFieldsByModeleAction } from '../../../../../../state/actions/customers-fields/customers-fields.actions';

@Component({
  selector: 'app-edit-metadata',
  templateUrl: './edit-metadata.component.html',
  styleUrls: ['./edit-metadata.component.css']
})
export class EditMetadataComponent {

  constructor(private store: Store<AppState>,){

    this.customerFields$ = this.store.select(getCustomersFieldsByModelResponse);
  }

  @Input() isOpenModal: boolean = false;
  @Input() details:any
  @Output() editEvent = new EventEmitter<{ title: string, description: string }>();
  @Output() closeModalEvent = new EventEmitter<void>();
  isTextAnnotationEmpty:boolean = true
  customerFields$: Observable<any[]> ;
  customerFields: any[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectable = true;
  removable = true;
  addOnBlur = true;

  isSpinnerLoading:boolean = false
  keywords: any[] = [

  ];
  announcer = inject(LiveAnnouncer);

    closeModal() {
      this.closeModalEvent.emit();
    }
  

    ngOnInit(): void {
    
      this.customerFields$.subscribe((customerFields) => {
        console.log('customerFields ---- ', customerFields); 
        this.customerFields = customerFields

  
      });

      this.store.dispatch(getFieldsByModeleAction({ modeleId: 1 }));
    }



  edit() {
    this.isSpinnerLoading = true
    this.isTextAnnotationEmpty = true
    this.editEvent.emit({ title: this.details.title, description: this.details.description });

  }

  


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(keyword: any): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);

      this.announcer.announce(`Removed ${keyword}`);
    }
  }

  editKey(keyword: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove keyword if it no longer has a name
    if (!value) {
      this.remove(keyword);
      return;
    }

    // Edit existing keyword
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords[index].name = value;
    }
  }

  @Input() notifySuccessEdit: string;
/* 
  ngOnChanges() {

    if (this.notifySuccessEdit) {
      alert( this.isSpinnerLoading )
      this.isTextAnnotationEmpty = true
      this.isSpinnerLoading = false
      this.closeModal()

    }
  } */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['notifySuccessEdit']) {
      this.onParentFunctionExecuted();
    }
  }

  onParentFunctionExecuted() {
    this.isTextAnnotationEmpty = true
    this.isSpinnerLoading = false
    console.log('Parent function executed. Data received:', this.notifySuccessEdit);
  }

  checkTextAnnotation() {
    this.isTextAnnotationEmpty = !this.details.description || this.details.title.trim().length === 0;
  }
}
