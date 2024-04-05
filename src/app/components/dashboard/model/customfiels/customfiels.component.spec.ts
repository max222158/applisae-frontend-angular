import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomfielsComponent } from './customfiels.component';

describe('CustomfielsComponent', () => {
  let component: CustomfielsComponent;
  let fixture: ComponentFixture<CustomfielsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomfielsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomfielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
