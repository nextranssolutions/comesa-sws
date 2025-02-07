import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteapprovalAppdashboardComponent } from './siteapproval-appdashboard.component';

describe('SiteapprovalAppdashboardComponent', () => {
  let component: SiteapprovalAppdashboardComponent;
  let fixture: ComponentFixture<SiteapprovalAppdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteapprovalAppdashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteapprovalAppdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
