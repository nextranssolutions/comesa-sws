import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesConfigurationsComponent } from './charges-configurations.component';

describe('ChargesConfigurationsComponent', () => {
  let component: ChargesConfigurationsComponent;
  let fixture: ComponentFixture<ChargesConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargesConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargesConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
