import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleNameComponentComponent } from './circle-name-component.component';

describe('CircleNameComponentComponent', () => {
  let component: CircleNameComponentComponent;
  let fixture: ComponentFixture<CircleNameComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CircleNameComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CircleNameComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
