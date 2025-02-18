import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodesconfigSetupComponent } from './hscodesconfig-setup.component';

describe('HscodesconfigSetupComponent', () => {
  let component: HscodesconfigSetupComponent;
  let fixture: ComponentFixture<HscodesconfigSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodesconfigSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodesconfigSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
