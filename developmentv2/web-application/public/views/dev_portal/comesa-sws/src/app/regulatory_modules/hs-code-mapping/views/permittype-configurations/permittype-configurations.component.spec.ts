import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermittypeConfigurationsComponent } from './permittype-configurations.component';

describe('PermittypeConfigurationsComponent', () => {
  let component: PermittypeConfigurationsComponent;
  let fixture: ComponentFixture<PermittypeConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermittypeConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermittypeConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
