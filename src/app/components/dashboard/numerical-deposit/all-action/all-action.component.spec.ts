import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActionComponent } from './all-action.component';

describe('AllActionComponent', () => {
  let component: AllActionComponent;
  let fixture: ComponentFixture<AllActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
