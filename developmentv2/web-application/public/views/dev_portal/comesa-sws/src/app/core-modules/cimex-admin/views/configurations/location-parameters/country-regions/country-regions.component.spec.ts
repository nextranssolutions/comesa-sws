import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryRegionsComponent } from './country-regions.component';

describe('CountryRegionsComponent', () => {
  let component: CountryRegionsComponent;
  let fixture: ComponentFixture<CountryRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryRegionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
