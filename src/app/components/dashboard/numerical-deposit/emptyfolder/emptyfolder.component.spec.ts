import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyfolderComponent } from './emptyfolder.component';

describe('EmptyfolderComponent', () => {
  let component: EmptyfolderComponent;
  let fixture: ComponentFixture<EmptyfolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyfolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyfolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
