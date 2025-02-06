import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteofAdministrationComponent } from './routeof-administration.component';

describe('RouteofAdministrationComponent', () => {
  let component: RouteofAdministrationComponent;
  let fixture: ComponentFixture<RouteofAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteofAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RouteofAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
