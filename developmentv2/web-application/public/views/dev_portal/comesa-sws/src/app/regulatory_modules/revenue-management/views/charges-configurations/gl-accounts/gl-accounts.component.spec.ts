import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlAccountsComponent } from './gl-accounts.component';

describe('GlAccountsComponent', () => {
  let component: GlAccountsComponent;
  let fixture: ComponentFixture<GlAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
