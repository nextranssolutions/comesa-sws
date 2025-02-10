import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesProductlineDetailsComponent } from './premises-productline-details.component';

describe('PremisesProductlineDetailsComponent', () => {
  let component: PremisesProductlineDetailsComponent;
  let fixture: ComponentFixture<PremisesProductlineDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremisesProductlineDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremisesProductlineDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
