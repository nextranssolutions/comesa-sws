import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderProceduresComponent } from './trader-procedures.component';

describe('TraderProceduresComponent', () => {
  let component: TraderProceduresComponent;
  let fixture: ComponentFixture<TraderProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraderProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
