import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingStatusComponent } from './mapping-status.component';

describe('MappingStatusComponent', () => {
  let component: MappingStatusComponent;
  let fixture: ComponentFixture<MappingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MappingStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MappingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
