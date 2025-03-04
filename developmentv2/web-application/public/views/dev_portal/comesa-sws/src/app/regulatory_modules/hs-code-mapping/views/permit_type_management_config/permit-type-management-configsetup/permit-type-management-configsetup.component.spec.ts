import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitTypeManagementConfigsetupComponent } from './permit-type-management-configsetup.component';

describe('PermitTypeManagementConfigsetupComponent', () => {
  let component: PermitTypeManagementConfigsetupComponent;
  let fixture: ComponentFixture<PermitTypeManagementConfigsetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermitTypeManagementConfigsetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermitTypeManagementConfigsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
