import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefnumberConfigsetupComponent } from './refnumber-configsetup.component';

describe('RefnumberConfigsetupComponent', () => {
  let component: RefnumberConfigsetupComponent;
  let fixture: ComponentFixture<RefnumberConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefnumberConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefnumberConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
