import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmppharmaceuticallicenseFeesComponent } from './gmppharmaceuticallicense-fees.component';

describe('GmppharmaceuticallicenseFeesComponent', () => {
  let component: GmppharmaceuticallicenseFeesComponent;
  let fixture: ComponentFixture<GmppharmaceuticallicenseFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmppharmaceuticallicenseFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmppharmaceuticallicenseFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
