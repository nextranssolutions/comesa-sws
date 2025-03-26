import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewImportappComponent } from './preview-importapp.component';

describe('PreviewImportappComponent', () => {
  let component: PreviewImportappComponent;
  let fixture: ComponentFixture<PreviewImportappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewImportappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewImportappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
