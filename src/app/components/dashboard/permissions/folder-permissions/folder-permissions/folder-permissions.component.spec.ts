import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderPermissionsComponent } from './folder-permissions.component';

describe('FolderPermissionsComponent', () => {
  let component: FolderPermissionsComponent;
  let fixture: ComponentFixture<FolderPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FolderPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FolderPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
