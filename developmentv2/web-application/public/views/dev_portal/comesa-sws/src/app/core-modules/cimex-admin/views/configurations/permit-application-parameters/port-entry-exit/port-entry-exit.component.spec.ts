import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortEntryExitComponent } from './port-entry-exit.component';

describe('PortEntryExitComponent', () => {
  let component: PortEntryExitComponent;
  let fixture: ComponentFixture<PortEntryExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortEntryExitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortEntryExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
