import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitTermsconditionsComponent } from './permit-termsconditions.component';

describe('PermitTermsconditionsComponent', () => {
  let component: PermitTermsconditionsComponent;
  let fixture: ComponentFixture<PermitTermsconditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitTermsconditionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitTermsconditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
