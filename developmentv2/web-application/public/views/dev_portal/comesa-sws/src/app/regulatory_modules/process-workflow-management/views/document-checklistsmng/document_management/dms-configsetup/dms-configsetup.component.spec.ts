import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsConfigsetupComponent } from './dms-configsetup.component';

describe('DmsConfigsetupComponent', () => {
  let component: DmsConfigsetupComponent;
  let fixture: ComponentFixture<DmsConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
