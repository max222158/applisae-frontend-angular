import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatingComponent } from './automating.component';

describe('AutomatingComponent', () => {
  let component: AutomatingComponent;
  let fixture: ComponentFixture<AutomatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
