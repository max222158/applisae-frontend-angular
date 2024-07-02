import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDropdownSearchComponent } from './users-dropdown-search.component';

describe('UsersDropdownSearchComponent', () => {
  let component: UsersDropdownSearchComponent;
  let fixture: ComponentFixture<UsersDropdownSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersDropdownSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersDropdownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
