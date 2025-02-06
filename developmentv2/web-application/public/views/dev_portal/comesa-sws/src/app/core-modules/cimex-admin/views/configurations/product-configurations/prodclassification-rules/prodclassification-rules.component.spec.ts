import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdclassificationRulesComponent } from './prodclassification-rules.component';

describe('ProdclassificationRulesComponent', () => {
  let component: ProdclassificationRulesComponent;
  let fixture: ComponentFixture<ProdclassificationRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdclassificationRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdclassificationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
