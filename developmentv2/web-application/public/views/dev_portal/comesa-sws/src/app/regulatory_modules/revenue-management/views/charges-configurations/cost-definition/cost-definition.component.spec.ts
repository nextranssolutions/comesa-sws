import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostDefinitionComponent } from './cost-definition.component';

describe('CostDefinitionComponent', () => {
  let component: CostDefinitionComponent;
  let fixture: ComponentFixture<CostDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostDefinitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
