import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryprocessDocdefinationComponent } from './regulatoryprocess-docdefination.component';

describe('RegulatoryprocessDocdefinationComponent', () => {
  let component: RegulatoryprocessDocdefinationComponent;
  let fixture: ComponentFixture<RegulatoryprocessDocdefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatoryprocessDocdefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulatoryprocessDocdefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
