import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefSubmodulesComponent } from './ref-submodules.component';

describe('RefSubmodulesComponent', () => {
  let component: RefSubmodulesComponent;
  let fixture: ComponentFixture<RefSubmodulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefSubmodulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefSubmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
