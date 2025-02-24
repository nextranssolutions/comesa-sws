import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentRequirementDefinationComponent } from './document-requirement-defination.component';

describe('DocumentRequirementDefinationComponent', () => {
  let component: DocumentRequirementDefinationComponent;
  let fixture: ComponentFixture<DocumentRequirementDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentRequirementDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentRequirementDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
