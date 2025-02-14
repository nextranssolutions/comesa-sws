import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportProceduresComponent } from './export-procedures.component';

describe('ExportProceduresComponent', () => {
  let component: ExportProceduresComponent;
  let fixture: ComponentFixture<ExportProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
