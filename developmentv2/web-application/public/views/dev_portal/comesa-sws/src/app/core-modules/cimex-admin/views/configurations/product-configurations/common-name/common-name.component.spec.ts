import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonNameComponent } from './common-name.component';

describe('CommonNameComponent', () => {
  let component: CommonNameComponent;
  let fixture: ComponentFixture<CommonNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
