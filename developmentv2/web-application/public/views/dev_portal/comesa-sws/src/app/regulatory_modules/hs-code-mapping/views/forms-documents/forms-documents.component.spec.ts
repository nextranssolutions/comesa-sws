import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDocumentsComponent } from './forms-documents.component';

describe('FormsDocumentsComponent', () => {
  let component: FormsDocumentsComponent;
  let fixture: ComponentFixture<FormsDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
