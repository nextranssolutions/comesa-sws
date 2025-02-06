import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmdnCodesComponent } from './gmdn-codes.component';

describe('GmdnCodesComponent', () => {
  let component: GmdnCodesComponent;
  let fixture: ComponentFixture<GmdnCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmdnCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GmdnCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
