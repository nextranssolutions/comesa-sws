import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodesmappingConfigsetupComponent } from './hscodesmapping-configsetup.component';

describe('HscodesmappingConfigsetupComponent', () => {
  let component: HscodesmappingConfigsetupComponent;
  let fixture: ComponentFixture<HscodesmappingConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodesmappingConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodesmappingConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
