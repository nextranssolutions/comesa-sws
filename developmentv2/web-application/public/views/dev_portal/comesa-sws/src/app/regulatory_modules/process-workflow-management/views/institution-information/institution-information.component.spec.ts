import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionInformationComponent } from './institution-information.component';

describe('InstitutionInformationComponent', () => {
  let component: InstitutionInformationComponent;
  let fixture: ComponentFixture<InstitutionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstitutionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
