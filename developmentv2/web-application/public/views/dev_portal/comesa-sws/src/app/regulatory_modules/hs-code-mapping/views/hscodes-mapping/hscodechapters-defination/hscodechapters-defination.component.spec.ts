import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HscodechaptersDefinationComponent } from './hscodechapters-defination.component';

describe('HscodechaptersDefinationComponent', () => {
  let component: HscodechaptersDefinationComponent;
  let fixture: ComponentFixture<HscodechaptersDefinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HscodechaptersDefinationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HscodechaptersDefinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
