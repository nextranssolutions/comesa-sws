import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitTemplateTypesComponent } from './permit-template-types.component';

describe('PermitTemplateTypesComponent', () => {
  let component: PermitTemplateTypesComponent;
  let fixture: ComponentFixture<PermitTemplateTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitTemplateTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitTemplateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
