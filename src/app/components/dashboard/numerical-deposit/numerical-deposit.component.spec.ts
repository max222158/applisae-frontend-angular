import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalDepositComponent } from './numerical-deposit.component';

describe('NumericalDepositComponent', () => {
  let component: NumericalDepositComponent;
  let fixture: ComponentFixture<NumericalDepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumericalDepositComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumericalDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
