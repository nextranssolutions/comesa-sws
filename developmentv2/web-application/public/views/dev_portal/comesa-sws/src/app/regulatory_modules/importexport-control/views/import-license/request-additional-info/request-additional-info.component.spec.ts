import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdditionalInfoComponent } from './request-additional-info.component';

describe('RequestAdditionalInfoComponent', () => {
  let component: RequestAdditionalInfoComponent;
  let fixture: ComponentFixture<RequestAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAdditionalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
