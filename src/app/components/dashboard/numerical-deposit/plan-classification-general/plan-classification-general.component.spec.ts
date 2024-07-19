import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanClassificationGeneralComponent } from './plan-classification-general.component';

describe('PlanClassificationGeneralComponent', () => {
  let component: PlanClassificationGeneralComponent;
  let fixture: ComponentFixture<PlanClassificationGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanClassificationGeneralComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanClassificationGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
