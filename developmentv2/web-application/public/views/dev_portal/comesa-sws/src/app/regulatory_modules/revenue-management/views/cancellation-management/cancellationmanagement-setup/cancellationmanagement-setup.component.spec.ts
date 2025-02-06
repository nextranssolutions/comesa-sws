import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellationmanagementSetupComponent } from './cancellationmanagement-setup.component';

describe('CancellationmanagementSetupComponent', () => {
  let component: CancellationmanagementSetupComponent;
  let fixture: ComponentFixture<CancellationmanagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancellationmanagementSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancellationmanagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
