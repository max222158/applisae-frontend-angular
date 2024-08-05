import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInformationDetailsCourrierComponent } from './modal-information-details-courrier.component';

describe('ModalInformationDetailsCourrierComponent', () => {
  let component: ModalInformationDetailsCourrierComponent;
  let fixture: ComponentFixture<ModalInformationDetailsCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalInformationDetailsCourrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalInformationDetailsCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
