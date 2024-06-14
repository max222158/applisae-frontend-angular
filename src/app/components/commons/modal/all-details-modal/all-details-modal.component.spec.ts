import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDetailsModalComponent } from './all-details-modal.component';

describe('AllDetailsModalComponent', () => {
  let component: AllDetailsModalComponent;
  let fixture: ComponentFixture<AllDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllDetailsModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
