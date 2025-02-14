import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodeMappingComponent } from './hscode-mapping.component';

describe('HscodeMappingComponent', () => {
  let component: HscodeMappingComponent;
  let fixture: ComponentFixture<HscodeMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodeMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodeMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
