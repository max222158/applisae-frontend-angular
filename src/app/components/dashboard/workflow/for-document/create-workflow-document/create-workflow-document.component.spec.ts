import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkflowDocumentComponent } from './create-workflow-document.component';

describe('CreateWorkflowDocumentComponent', () => {
  let component: CreateWorkflowDocumentComponent;
  let fixture: ComponentFixture<CreateWorkflowDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateWorkflowDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWorkflowDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
