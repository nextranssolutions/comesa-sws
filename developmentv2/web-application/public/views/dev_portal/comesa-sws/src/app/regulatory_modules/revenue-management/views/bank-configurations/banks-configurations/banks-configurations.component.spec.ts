import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksConfigurationsComponent } from './banks-configurations.component';

describe('BanksConfigurationsComponent', () => {
  let component: BanksConfigurationsComponent;
  let fixture: ComponentFixture<BanksConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanksConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanksConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
