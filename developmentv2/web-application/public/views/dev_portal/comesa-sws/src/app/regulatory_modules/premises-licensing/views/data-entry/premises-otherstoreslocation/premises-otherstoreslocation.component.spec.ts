import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisesOtherstoreslocationComponent } from './premises-otherstoreslocation.component';

describe('PremisesOtherstoreslocationComponent', () => {
  let component: PremisesOtherstoreslocationComponent;
  let fixture: ComponentFixture<PremisesOtherstoreslocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremisesOtherstoreslocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremisesOtherstoreslocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
