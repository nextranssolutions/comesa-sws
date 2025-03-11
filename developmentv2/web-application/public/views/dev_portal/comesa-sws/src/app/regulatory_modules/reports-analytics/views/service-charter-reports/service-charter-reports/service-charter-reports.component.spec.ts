import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCharterReportsComponent } from './service-charter-reports.component';

describe('ServiceCharterReportsComponent', () => {
  let component: ServiceCharterReportsComponent;
  let fixture: ComponentFixture<ServiceCharterReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCharterReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCharterReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
