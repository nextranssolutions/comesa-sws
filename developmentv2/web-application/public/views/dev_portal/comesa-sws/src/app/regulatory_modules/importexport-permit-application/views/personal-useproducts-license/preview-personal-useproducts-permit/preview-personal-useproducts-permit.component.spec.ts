import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPersonalUseproductsPermitComponent } from './preview-personal-useproducts-permit.component';

describe('PreviewPersonalUseproductsPermitComponent', () => {
  let component: PreviewPersonalUseproductsPermitComponent;
  let fixture: ComponentFixture<PreviewPersonalUseproductsPermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPersonalUseproductsPermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewPersonalUseproductsPermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
