import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCustomerFieldCardDisplayComponent } from './single-customer-field-card-display.component';

describe('SingleCustomerFieldCardDisplayComponent', () => {
  let component: SingleCustomerFieldCardDisplayComponent;
  let fixture: ComponentFixture<SingleCustomerFieldCardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleCustomerFieldCardDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCustomerFieldCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
