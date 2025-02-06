import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportpermitFeesComponent } from './importexportpermit-fees.component';

describe('ImportexportpermitFeesComponent', () => {
  let component: ImportexportpermitFeesComponent;
  let fixture: ComponentFixture<ImportexportpermitFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportpermitFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportpermitFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
