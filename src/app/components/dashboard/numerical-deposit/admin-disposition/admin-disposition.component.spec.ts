import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDispositionComponent } from './admin-disposition.component';

describe('AdminDispositionComponent', () => {
  let component: AdminDispositionComponent;
  let fixture: ComponentFixture<AdminDispositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDispositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDispositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
