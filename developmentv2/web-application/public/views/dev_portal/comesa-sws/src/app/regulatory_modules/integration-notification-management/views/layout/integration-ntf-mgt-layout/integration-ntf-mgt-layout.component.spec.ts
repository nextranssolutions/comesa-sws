import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationNtfMgtLayoutComponent } from './integration-ntf-mgt-layout.component';

describe('IntegrationNtfMgtLayoutComponent', () => {
  let component: IntegrationNtfMgtLayoutComponent;
  let fixture: ComponentFixture<IntegrationNtfMgtLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntegrationNtfMgtLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntegrationNtfMgtLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
