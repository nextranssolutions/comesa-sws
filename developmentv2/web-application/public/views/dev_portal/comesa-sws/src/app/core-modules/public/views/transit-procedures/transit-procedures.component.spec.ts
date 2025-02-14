import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitProceduresComponent } from './transit-procedures.component';

describe('TransitProceduresComponent', () => {
  let component: TransitProceduresComponent;
  let fixture: ComponentFixture<TransitProceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitProceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransitProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
