import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCourrierHtmlComponent } from './model-courrier-html.component';

describe('ModelCourrierHtmlComponent', () => {
  let component: ModelCourrierHtmlComponent;
  let fixture: ComponentFixture<ModelCourrierHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelCourrierHtmlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelCourrierHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
