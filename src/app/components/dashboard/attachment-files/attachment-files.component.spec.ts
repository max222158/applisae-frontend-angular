import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentFilesComponent } from './attachment-files.component';

describe('AttachmentFilesComponent', () => {
  let component: AttachmentFilesComponent;
  let fixture: ComponentFixture<AttachmentFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttachmentFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttachmentFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
