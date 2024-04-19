import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCourrierComponent } from './my-courrier.component';

describe('MyCourrierComponent', () => {
  let component: MyCourrierComponent;
  let fixture: ComponentFixture<MyCourrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCourrierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCourrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
