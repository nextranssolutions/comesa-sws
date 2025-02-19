import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealsTypesComponent } from './appeals-types.component';

describe('AppealsTypesComponent', () => {
  let component: AppealsTypesComponent;
  let fixture: ComponentFixture<AppealsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppealsTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppealsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
