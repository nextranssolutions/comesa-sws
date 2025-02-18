import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedhscodesConfigurationsComponent } from './sharedhscodes-configurations.component';

describe('SharedhscodesConfigurationsComponent', () => {
  let component: SharedhscodesConfigurationsComponent;
  let fixture: ComponentFixture<SharedhscodesConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedhscodesConfigurationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedhscodesConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
