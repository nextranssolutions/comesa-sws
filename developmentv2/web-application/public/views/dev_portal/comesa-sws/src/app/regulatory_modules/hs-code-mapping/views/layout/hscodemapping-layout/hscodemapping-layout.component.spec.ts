import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodemappingLayoutComponent } from './hscodemapping-layout.component';

describe('HscodemappingLayoutComponent', () => {
  let component: HscodemappingLayoutComponent;
  let fixture: ComponentFixture<HscodemappingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodemappingLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodemappingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
