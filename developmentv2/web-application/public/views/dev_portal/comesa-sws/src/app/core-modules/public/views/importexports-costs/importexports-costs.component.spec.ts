import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportsCostsComponent } from './importexports-costs.component';

describe('ImportexportsCostsComponent', () => {
  let component: ImportexportsCostsComponent;
  let fixture: ComponentFixture<ImportexportsCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportsCostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportsCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
