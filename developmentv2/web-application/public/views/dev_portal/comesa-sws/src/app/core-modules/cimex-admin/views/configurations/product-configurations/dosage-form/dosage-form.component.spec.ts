import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosageFormComponent } from './dosage-form.component';

describe('DosageFormComponent', () => {
  let component: DosageFormComponent;
  let fixture: ComponentFixture<DosageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DosageFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DosageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
