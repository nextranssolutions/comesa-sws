import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesBusinessoperationsComponent } from './premises-businessoperations.component';

describe('PremisesBusinessoperationsComponent', () => {
  let component: PremisesBusinessoperationsComponent;
  let fixture: ComponentFixture<PremisesBusinessoperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremisesBusinessoperationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremisesBusinessoperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
