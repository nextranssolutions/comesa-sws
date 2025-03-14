import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductExportpermitComponent } from './single-product-exportpermit.component';

describe('SingleProductExportpermitComponent', () => {
  let component: SingleProductExportpermitComponent;
  let fixture: ComponentFixture<SingleProductExportpermitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductExportpermitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleProductExportpermitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
