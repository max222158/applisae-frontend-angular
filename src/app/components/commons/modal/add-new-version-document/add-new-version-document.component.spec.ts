import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVersionDocumentComponent } from './add-new-version-document.component';

describe('AddNewVersionDocumentComponent', () => {
  let component: AddNewVersionDocumentComponent;
  let fixture: ComponentFixture<AddNewVersionDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewVersionDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewVersionDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
