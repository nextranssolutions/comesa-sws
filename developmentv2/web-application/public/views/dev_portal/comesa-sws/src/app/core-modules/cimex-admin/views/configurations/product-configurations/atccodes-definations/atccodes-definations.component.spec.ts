import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtccodesDefinationsComponent } from './atccodes-definations.component';

describe('AtccodesDefinationsComponent', () => {
  let component: AtccodesDefinationsComponent;
  let fixture: ComponentFixture<AtccodesDefinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtccodesDefinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtccodesDefinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
