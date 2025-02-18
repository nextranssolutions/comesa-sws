import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDmsComponent } from './shared-dms.component';

describe('SharedDmsComponent', () => {
  let component: SharedDmsComponent;
  let fixture: ComponentFixture<SharedDmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedDmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
