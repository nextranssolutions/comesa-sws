import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopMasterlistComponent } from './sop-masterlist.component';

describe('SopMasterlistComponent', () => {
  let component: SopMasterlistComponent;
  let fixture: ComponentFixture<SopMasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SopMasterlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SopMasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
