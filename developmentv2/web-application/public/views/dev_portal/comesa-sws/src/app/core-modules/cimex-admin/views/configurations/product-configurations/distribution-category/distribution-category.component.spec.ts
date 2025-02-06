import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionCategoryComponent } from './distribution-category.component';

describe('DistributionCategoryComponent', () => {
  let component: DistributionCategoryComponent;
  let fixture: ComponentFixture<DistributionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributionCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
