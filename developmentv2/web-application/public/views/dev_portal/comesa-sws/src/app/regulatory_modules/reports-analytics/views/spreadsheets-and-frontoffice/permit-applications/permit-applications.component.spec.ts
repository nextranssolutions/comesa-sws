import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitApplicationsComponent } from './permit-applications.component';

describe('PermitApplicationsComponent', () => {
  let component: PermitApplicationsComponent;
  let fixture: ComponentFixture<PermitApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
