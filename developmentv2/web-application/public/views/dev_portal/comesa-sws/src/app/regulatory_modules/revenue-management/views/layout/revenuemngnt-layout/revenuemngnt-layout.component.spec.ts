import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuemngntLayoutComponent } from './revenuemngnt-layout.component';

describe('RevenuemngntLayoutComponent', () => {
  let component: RevenuemngntLayoutComponent;
  let fixture: ComponentFixture<RevenuemngntLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenuemngntLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenuemngntLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
