import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PUnderScreeningComponent } from './p-under-screening.component';

describe('PUnderScreeningComponent', () => {
  let component: PUnderScreeningComponent;
  let fixture: ComponentFixture<PUnderScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PUnderScreeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PUnderScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
