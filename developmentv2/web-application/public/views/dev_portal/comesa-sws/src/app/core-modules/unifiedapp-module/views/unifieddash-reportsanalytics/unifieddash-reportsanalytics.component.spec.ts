import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnifieddashReportsanalyticsComponent } from './unifieddash-reportsanalytics.component';

describe('UnifieddashReportsanalyticsComponent', () => {
  let component: UnifieddashReportsanalyticsComponent;
  let fixture: ComponentFixture<UnifieddashReportsanalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnifieddashReportsanalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnifieddashReportsanalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
