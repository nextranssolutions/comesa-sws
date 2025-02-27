import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicedeliveryConfigsetupComponent } from './servicedelivery-configsetup.component';

describe('ServicedeliveryConfigsetupComponent', () => {
  let component: ServicedeliveryConfigsetupComponent;
  let fixture: ComponentFixture<ServicedeliveryConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicedeliveryConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServicedeliveryConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
