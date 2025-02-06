import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenuemngntHeaderComponent } from './revenuemngnt-header.component';

describe('RevenuemngntHeaderComponent', () => {
  let component: RevenuemngntHeaderComponent;
  let fixture: ComponentFixture<RevenuemngntHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenuemngntHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevenuemngntHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
