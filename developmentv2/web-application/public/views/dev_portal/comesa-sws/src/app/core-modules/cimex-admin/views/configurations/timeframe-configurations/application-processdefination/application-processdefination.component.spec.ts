import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProcessdefinationComponent } from './application-processdefination.component';

describe('ApplicationProcessdefinationComponent', () => {
  let component: ApplicationProcessdefinationComponent;
  let fixture: ComponentFixture<ApplicationProcessdefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationProcessdefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationProcessdefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
