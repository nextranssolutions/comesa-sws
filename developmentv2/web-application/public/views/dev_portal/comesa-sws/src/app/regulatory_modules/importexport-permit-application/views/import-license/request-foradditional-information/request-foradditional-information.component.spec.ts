import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForadditionalInformationComponent } from './request-foradditional-information.component';

describe('RequestForadditionalInformationComponent', () => {
  let component: RequestForadditionalInformationComponent;
  let fixture: ComponentFixture<RequestForadditionalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestForadditionalInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestForadditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
