import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentInWorkflowComponent } from './document-in-workflow.component';

describe('DocumentInWorkflowComponent', () => {
  let component: DocumentInWorkflowComponent;
  let fixture: ComponentFixture<DocumentInWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentInWorkflowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentInWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
