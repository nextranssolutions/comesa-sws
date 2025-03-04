import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDocumentManagementSysComponent } from './shared-document-management-sys.component';

describe('SharedDocumentManagementSysComponent', () => {
  let component: SharedDocumentManagementSysComponent;
  let fixture: ComponentFixture<SharedDocumentManagementSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDocumentManagementSysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedDocumentManagementSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
