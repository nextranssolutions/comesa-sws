import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedImportexportProceduresComponent } from './shared-importexport-procedures.component';

describe('SharedImportexportProceduresComponent', () => {
  let component: SharedImportexportProceduresComponent;
  let fixture: ComponentFixture<SharedImportexportProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedImportexportProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedImportexportProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
