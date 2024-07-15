import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderDocumentComponent } from './reader-document.component';

describe('ReaderDocumentComponent', () => {
  let component: ReaderDocumentComponent;
  let fixture: ComponentFixture<ReaderDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReaderDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReaderDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
