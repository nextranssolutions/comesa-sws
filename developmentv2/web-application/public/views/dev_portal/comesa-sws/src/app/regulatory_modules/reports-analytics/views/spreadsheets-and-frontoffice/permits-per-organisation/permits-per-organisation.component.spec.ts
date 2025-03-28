import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitsPerOrganisationComponent } from './permits-per-organisation.component';

describe('PermitsPerOrganisationComponent', () => {
  let component: PermitsPerOrganisationComponent;
  let fixture: ComponentFixture<PermitsPerOrganisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitsPerOrganisationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitsPerOrganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
