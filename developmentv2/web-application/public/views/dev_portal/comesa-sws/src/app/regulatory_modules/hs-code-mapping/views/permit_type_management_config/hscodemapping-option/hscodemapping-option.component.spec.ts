import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodemappingOptionComponent } from './hscodemapping-option.component';

describe('HscodemappingOptionComponent', () => {
  let component: HscodemappingOptionComponent;
  let fixture: ComponentFixture<HscodemappingOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodemappingOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodemappingOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
