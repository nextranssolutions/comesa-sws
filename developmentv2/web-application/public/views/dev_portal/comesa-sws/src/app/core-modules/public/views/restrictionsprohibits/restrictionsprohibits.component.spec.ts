import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionsprohibitsComponent } from './restrictionsprohibits.component';

describe('RestrictionsprohibitsComponent', () => {
  let component: RestrictionsprohibitsComponent;
  let fixture: ComponentFixture<RestrictionsprohibitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestrictionsprohibitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestrictionsprohibitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
