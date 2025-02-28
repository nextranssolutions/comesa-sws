import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPermitapplicationComponent } from './shared-permitapplication.component';

describe('SharedPermitapplicationComponent', () => {
  let component: SharedPermitapplicationComponent;
  let fixture: ComponentFixture<SharedPermitapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPermitapplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPermitapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
