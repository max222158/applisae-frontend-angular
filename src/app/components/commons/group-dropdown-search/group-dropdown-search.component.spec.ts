import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDropdownSearchComponent } from './group-dropdown-search.component';

describe('GroupDropdownSearchComponent', () => {
  let component: GroupDropdownSearchComponent;
  let fixture: ComponentFixture<GroupDropdownSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupDropdownSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupDropdownSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
