import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodemappingNavigationComponent } from './hscodemapping-navigation.component';

describe('HscodemappingNavigationComponent', () => {
  let component: HscodemappingNavigationComponent;
  let fixture: ComponentFixture<HscodemappingNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodemappingNavigationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodemappingNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
