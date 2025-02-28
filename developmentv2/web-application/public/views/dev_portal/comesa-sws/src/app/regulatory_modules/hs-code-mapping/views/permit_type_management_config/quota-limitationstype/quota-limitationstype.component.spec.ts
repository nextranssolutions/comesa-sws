import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaLimitationstypeComponent } from './quota-limitationstype.component';

describe('QuotaLimitationstypeComponent', () => {
  let component: QuotaLimitationstypeComponent;
  let fixture: ComponentFixture<QuotaLimitationstypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuotaLimitationstypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuotaLimitationstypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
