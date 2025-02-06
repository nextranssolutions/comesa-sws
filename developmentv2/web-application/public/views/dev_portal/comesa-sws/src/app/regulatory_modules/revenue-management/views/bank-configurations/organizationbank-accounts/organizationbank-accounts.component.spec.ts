import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationbankAccountsComponent } from './organizationbank-accounts.component';

describe('OrganizationbankAccountsComponent', () => {
  let component: OrganizationbankAccountsComponent;
  let fixture: ComponentFixture<OrganizationbankAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationbankAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationbankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
