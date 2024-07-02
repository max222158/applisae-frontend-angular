import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFieldsDropdownComponent } from './customer-fields-dropdown.component';

describe('CustomerFieldsDropdownComponent', () => {
  let component: CustomerFieldsDropdownComponent;
  let fixture: ComponentFixture<CustomerFieldsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerFieldsDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerFieldsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
