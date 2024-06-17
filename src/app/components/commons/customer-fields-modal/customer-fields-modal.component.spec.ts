import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFieldsModalComponent } from './customer-fields-modal.component';

describe('CustomerFieldsModalComponent', () => {
  let component: CustomerFieldsModalComponent;
  let fixture: ComponentFixture<CustomerFieldsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFieldsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFieldsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
