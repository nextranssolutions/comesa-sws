import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExpressionofinterestreportsComponent } from './app-expressionofinterestreports.component';

describe('AppExpressionofinterestreportsComponent', () => {
  let component: AppExpressionofinterestreportsComponent;
  let fixture: ComponentFixture<AppExpressionofinterestreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppExpressionofinterestreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppExpressionofinterestreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
