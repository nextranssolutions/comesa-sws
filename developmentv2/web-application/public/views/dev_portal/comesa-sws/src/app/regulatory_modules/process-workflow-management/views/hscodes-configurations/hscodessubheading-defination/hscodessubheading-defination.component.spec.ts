import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodessubheadingDefinationComponent } from './hscodessubheading-defination.component';

describe('HscodessubheadingDefinationComponent', () => {
  let component: HscodessubheadingDefinationComponent;
  let fixture: ComponentFixture<HscodessubheadingDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodessubheadingDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodessubheadingDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
