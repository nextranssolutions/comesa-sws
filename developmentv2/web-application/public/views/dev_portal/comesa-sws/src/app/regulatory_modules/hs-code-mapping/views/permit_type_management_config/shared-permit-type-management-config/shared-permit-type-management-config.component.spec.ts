import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPermitTypeManagementConfigComponent } from './shared-permit-type-management-config.component';

describe('SharedPermitTypeManagementConfigComponent', () => {
  let component: SharedPermitTypeManagementConfigComponent;
  let fixture: ComponentFixture<SharedPermitTypeManagementConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPermitTypeManagementConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedPermitTypeManagementConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
