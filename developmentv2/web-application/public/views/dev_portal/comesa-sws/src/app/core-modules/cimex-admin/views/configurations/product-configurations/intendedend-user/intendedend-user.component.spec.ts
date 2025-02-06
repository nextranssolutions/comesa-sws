import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntendedendUserComponent } from './intendedend-user.component';

describe('IntendedendUserComponent', () => {
  let component: IntendedendUserComponent;
  let fixture: ComponentFixture<IntendedendUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntendedendUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntendedendUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
