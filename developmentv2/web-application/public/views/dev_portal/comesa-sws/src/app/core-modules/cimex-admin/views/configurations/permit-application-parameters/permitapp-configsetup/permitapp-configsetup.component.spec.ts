import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitappConfigsetupComponent } from './permitapp-configsetup.component';

describe('PermitappConfigsetupComponent', () => {
  let component: PermitappConfigsetupComponent;
  let fixture: ComponentFixture<PermitappConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitappConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitappConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
