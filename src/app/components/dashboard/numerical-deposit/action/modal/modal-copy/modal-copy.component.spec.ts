import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCopyComponent } from './modal-copy.component';

describe('ModalCopyComponent', () => {
  let component: ModalCopyComponent;
  let fixture: ComponentFixture<ModalCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCopyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
