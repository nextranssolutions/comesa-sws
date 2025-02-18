import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInstitutionsComponent } from './app-institutions.component';

describe('AppInstitutionsComponent', () => {
  let component: AppInstitutionsComponent;
  let fixture: ComponentFixture<AppInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInstitutionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
