import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCountriesComponent } from './location-countries.component';

describe('LocationCountriesComponent', () => {
  let component: LocationCountriesComponent;
  let fixture: ComponentFixture<LocationCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationCountriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
