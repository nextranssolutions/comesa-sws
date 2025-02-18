import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodesheadingDefinationsComponent } from './hscodesheading-definations.component';

describe('HscodesheadingDefinationsComponent', () => {
  let component: HscodesheadingDefinationsComponent;
  let fixture: ComponentFixture<HscodesheadingDefinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodesheadingDefinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodesheadingDefinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
