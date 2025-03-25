import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderScreeningComponent } from './under-screening.component';

describe('UnderScreeningComponent', () => {
  let component: UnderScreeningComponent;
  let fixture: ComponentFixture<UnderScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnderScreeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnderScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
