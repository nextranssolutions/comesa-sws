import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeinstitutionsConfigsetupComponent } from './hscodeinstitutions-configsetup.component';

describe('HscodeinstitutionsConfigsetupComponent', () => {
  let component: HscodeinstitutionsConfigsetupComponent;
  let fixture: ComponentFixture<HscodeinstitutionsConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeinstitutionsConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeinstitutionsConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
