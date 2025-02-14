import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationNtfMgtNavigationComponent } from './integration-ntf-mgt-navigation.component';

describe('IntegrationNtfMgtNavigationComponent', () => {
  let component: IntegrationNtfMgtNavigationComponent;
  let fixture: ComponentFixture<IntegrationNtfMgtNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationNtfMgtNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationNtfMgtNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
