import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsPermissionsComponent } from './user-groups-permissions.component';

describe('UserGroupsPermissionsComponent', () => {
  let component: UserGroupsPermissionsComponent;
  let fixture: ComponentFixture<UserGroupsPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupsPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGroupsPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
