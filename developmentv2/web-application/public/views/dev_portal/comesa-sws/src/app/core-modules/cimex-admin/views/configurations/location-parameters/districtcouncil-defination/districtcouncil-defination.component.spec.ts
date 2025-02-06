import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictcouncilDefinationComponent } from './districtcouncil-defination.component';

describe('DistrictcouncilDefinationComponent', () => {
  let component: DistrictcouncilDefinationComponent;
  let fixture: ComponentFixture<DistrictcouncilDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictcouncilDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistrictcouncilDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
