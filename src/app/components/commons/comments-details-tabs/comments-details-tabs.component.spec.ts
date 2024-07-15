import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsDetailsTabsComponent } from './comments-details-tabs.component';

describe('CommentsDetailsTabsComponent', () => {
  let component: CommentsDetailsTabsComponent;
  let fixture: ComponentFixture<CommentsDetailsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsDetailsTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentsDetailsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
