import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAnnotationsComponent } from './modal-annotations.component';

describe('ModalAnnotationsComponent', () => {
  let component: ModalAnnotationsComponent;
  let fixture: ComponentFixture<ModalAnnotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAnnotationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
