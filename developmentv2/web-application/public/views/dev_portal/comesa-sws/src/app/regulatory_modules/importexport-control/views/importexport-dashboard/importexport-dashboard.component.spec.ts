import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportexportDashboardComponent } from './importexport-dashboard.component';

describe('ImportexportDashboardComponent', () => {
  let component: ImportexportDashboardComponent;
  let fixture: ComponentFixture<ImportexportDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportexportDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportexportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
