import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFileComponent } from './details-file.component';

describe('DetailsFileComponent', () => {
  let component: DetailsFileComponent;
  let fixture: ComponentFixture<DetailsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
