import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportProceduresComponent } from './import-procedures.component';

describe('ImportProceduresComponent', () => {
  let component: ImportProceduresComponent;
  let fixture: ComponentFixture<ImportProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
