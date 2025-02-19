import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryFunctionsComponent } from './regulatory-functions.component';

describe('RegulatoryFunctionsComponent', () => {
  let component: RegulatoryFunctionsComponent;
  let fixture: ComponentFixture<RegulatoryFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatoryFunctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulatoryFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
