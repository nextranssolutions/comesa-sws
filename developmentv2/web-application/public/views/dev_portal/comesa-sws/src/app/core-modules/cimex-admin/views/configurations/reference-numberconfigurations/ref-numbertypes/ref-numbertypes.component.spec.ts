import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefNumbertypesComponent } from './ref-numbertypes.component';

describe('RefNumbertypesComponent', () => {
  let component: RefNumbertypesComponent;
  let fixture: ComponentFixture<RefNumbertypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefNumbertypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefNumbertypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
