import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeHelperComponent } from './iframe-helper.component';

describe('IframeHelperComponent', () => {
  let component: IframeHelperComponent;
  let fixture: ComponentFixture<IframeHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IframeHelperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IframeHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
