import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmsConfigurationsetupComponent } from './dms-configurationsetup.component';

describe('DmsConfigurationsetupComponent', () => {
  let component: DmsConfigurationsetupComponent;
  let fixture: ComponentFixture<DmsConfigurationsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DmsConfigurationsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DmsConfigurationsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
