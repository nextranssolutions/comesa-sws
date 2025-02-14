import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodemappingHeaderComponent } from './hscodemapping-header.component';

describe('HscodemappingHeaderComponent', () => {
  let component: HscodemappingHeaderComponent;
  let fixture: ComponentFixture<HscodemappingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodemappingHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodemappingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
