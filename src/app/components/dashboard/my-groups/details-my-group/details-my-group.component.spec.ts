import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMyGroupComponent } from './details-my-group.component';

describe('DetailsMyGroupComponent', () => {
  let component: DetailsMyGroupComponent;
  let fixture: ComponentFixture<DetailsMyGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsMyGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsMyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
