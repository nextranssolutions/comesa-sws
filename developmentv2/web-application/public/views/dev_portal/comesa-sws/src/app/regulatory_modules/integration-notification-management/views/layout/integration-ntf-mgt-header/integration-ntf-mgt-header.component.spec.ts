import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationNtfMgtHeaderComponent } from './integration-ntf-mgt-header.component';

describe('IntegrationNtfMgtHeaderComponent', () => {
  let component: IntegrationNtfMgtHeaderComponent;
  let fixture: ComponentFixture<IntegrationNtfMgtHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationNtfMgtHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationNtfMgtHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
