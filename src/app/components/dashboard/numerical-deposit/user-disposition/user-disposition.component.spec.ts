import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDispositionComponent } from './user-disposition.component';

describe('UserDispositionComponent', () => {
  let component: UserDispositionComponent;
  let fixture: ComponentFixture<UserDispositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDispositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
