import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGroupUsersComponent } from './modal-group-users.component';

describe('ModalGroupUsersComponent', () => {
  let component: ModalGroupUsersComponent;
  let fixture: ComponentFixture<ModalGroupUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalGroupUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalGroupUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
