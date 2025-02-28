import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortEntryTypeComponent } from './port-entry-type.component';

describe('PortEntryTypeComponent', () => {
  let component: PortEntryTypeComponent;
  let fixture: ComponentFixture<PortEntryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortEntryTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortEntryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
