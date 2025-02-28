import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderdbproceduresSetupComponent } from './traderdbprocedures-setup.component';

describe('TraderdbproceduresSetupComponent', () => {
  let component: TraderdbproceduresSetupComponent;
  let fixture: ComponentFixture<TraderdbproceduresSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderdbproceduresSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraderdbproceduresSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
