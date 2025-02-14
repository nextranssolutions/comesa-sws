import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExtensionTypesComponent } from './document-extension-types.component';

describe('DocumentExtensionTypesComponent', () => {
  let component: DocumentExtensionTypesComponent;
  let fixture: ComponentFixture<DocumentExtensionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentExtensionTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentExtensionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
