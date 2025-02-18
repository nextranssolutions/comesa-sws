import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeDashboardComponent } from './hscode-dashboard.component';

describe('HscodeDashboardComponent', () => {
  let component: HscodeDashboardComponent;
  let fixture: ComponentFixture<HscodeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
