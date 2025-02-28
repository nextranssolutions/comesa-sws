import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportProceduredetailsComponent } from './importexport-proceduredetails.component';

describe('ImportexportProceduredetailsComponent', () => {
  let component: ImportexportProceduredetailsComponent;
  let fixture: ComponentFixture<ImportexportProceduredetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportProceduredetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportProceduredetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
