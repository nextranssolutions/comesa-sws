import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegFunctionsComponent } from './reg-functions.component';

describe('RegFunctionsComponent', () => {
  let component: RegFunctionsComponent;
  let fixture: ComponentFixture<RegFunctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegFunctionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
