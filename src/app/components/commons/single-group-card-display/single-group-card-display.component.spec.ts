import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGroupCardDisplayComponent } from './single-group-card-display.component';

describe('SingleGroupCardDisplayComponent', () => {
  let component: SingleGroupCardDisplayComponent;
  let fixture: ComponentFixture<SingleGroupCardDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleGroupCardDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleGroupCardDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
