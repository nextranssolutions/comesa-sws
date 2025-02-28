import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTraderdbproceduresComponent } from './shared-traderdbprocedures.component';

describe('SharedTraderdbproceduresComponent', () => {
  let component: SharedTraderdbproceduresComponent;
  let fixture: ComponentFixture<SharedTraderdbproceduresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTraderdbproceduresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedTraderdbproceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
