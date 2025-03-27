import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestforadditionalInfoComponent } from './requestforadditional-info.component';

describe('RequestforadditionalInfoComponent', () => {
  let component: RequestforadditionalInfoComponent;
  let fixture: ComponentFixture<RequestforadditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestforadditionalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestforadditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
