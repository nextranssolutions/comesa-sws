import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftExportlicencedashboardComponent } from './draft-exportlicencedashboard.component';

describe('DraftExportlicencedashboardComponent', () => {
  let component: DraftExportlicencedashboardComponent;
  let fixture: ComponentFixture<DraftExportlicencedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftExportlicencedashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DraftExportlicencedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
