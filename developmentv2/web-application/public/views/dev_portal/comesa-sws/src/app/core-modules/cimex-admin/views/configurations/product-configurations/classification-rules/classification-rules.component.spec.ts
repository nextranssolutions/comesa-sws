import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationRulesComponent } from './classification-rules.component';

describe('ClassificationRulesComponent', () => {
  let component: ClassificationRulesComponent;
  let fixture: ComponentFixture<ClassificationRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassificationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
