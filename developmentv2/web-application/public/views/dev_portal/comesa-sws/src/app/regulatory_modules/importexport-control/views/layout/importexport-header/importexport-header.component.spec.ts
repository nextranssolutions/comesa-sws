import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportHeaderComponent } from './importexport-header.component';

describe('ImportexportHeaderComponent', () => {
  let component: ImportexportHeaderComponent;
  let fixture: ComponentFixture<ImportexportHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
