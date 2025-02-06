import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntendedendUseComponent } from './intendedend-use.component';

describe('IntendedendUseComponent', () => {
  let component: IntendedendUseComponent;
  let fixture: ComponentFixture<IntendedendUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntendedendUseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntendedendUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
