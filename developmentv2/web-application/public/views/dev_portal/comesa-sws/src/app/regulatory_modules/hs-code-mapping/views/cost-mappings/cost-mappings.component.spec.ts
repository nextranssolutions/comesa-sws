import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostMappingsComponent } from './cost-mappings.component';

describe('CostMappingsComponent', () => {
  let component: CostMappingsComponent;
  let fixture: ComponentFixture<CostMappingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostMappingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
